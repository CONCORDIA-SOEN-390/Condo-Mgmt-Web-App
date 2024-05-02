import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId, propertyId } = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // check if property exists
        const prop = await client.query("SELECT * FROM property WHERE user_id = $1 AND property_id = $2", [userId, propertyId]);

        if (prop.rows.length === 0) {
            return new Response("Error fetching property data", {
                status: 404
            });
        }

        // get rows from the request table for propertyId  with type_name, status_name, and creator username
        const reqs = await client.query(`
        SELECT 
            p.property_name,
            p.address,
            COALESCE(u.condo_fee, 0) + COALESCE(l.locker_fee, 0) + COALESCE(pr.parking_fee, 0) AS total_condo_fee
        FROM 
            property p
        LEFT JOIN (
            SELECT 
                property_id,
                SUM(condo_fee) AS condo_fee
            FROM 
                unit
            GROUP BY 
                property_id
        ) u ON p.property_id = u.property_id
        LEFT JOIN (
            SELECT 
                property_id,
                SUM(CASE WHEN occupied THEN condo_fee ELSE 0 END) AS locker_fee
            FROM 
                locker
            GROUP BY 
                property_id
        ) l ON p.property_id = l.property_id
        LEFT JOIN (
            SELECT 
                property_id,
                SUM(CASE WHEN occupied THEN condo_fee ELSE 0 END) AS parking_fee
            FROM 
                parking
            GROUP BY 
                property_id
        ) pr ON p.property_id = pr.property_id
        WHERE 
            p.property_type = 'rental'
            AND p.property_id = $1;
        `, [propertyId]);

        // commit the transaction
        await client.query("COMMIT");

        // return json string to client side
        return new Response(JSON.stringify(reqs.rows[0]), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        await client.query("ROLLBACK"); // Rollback the transaction if an error occurs
        console.error("Error getting data from tables:", error);
        return new Response('Internal Server Error', {
            status: 500
        });
    } finally {
        client.release();
    }
}
