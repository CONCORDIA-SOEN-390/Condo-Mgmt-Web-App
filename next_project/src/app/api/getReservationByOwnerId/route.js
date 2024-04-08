// Import necessary modules
import pool from "../../../../utils/db";

export async function POST(req) {
    try {
        const body = await req.json();
        const { ownerId, propertyId } = body;

        const client = await pool.connect();

        const reqs = await client.query(`
            SELECT
                r.*,
                f.name AS facility_name,
                u.username
            FROM
                reservation r
                    JOIN facility f ON r.facility_id = f.facility_id
                    JOIN users u ON r.user_id = u.user_id
            WHERE
                r.user_id = $1
                AND r.property_id = $2;
        `, [ownerId, propertyId]);

        client.release();

        const fetchedData = reqs.rows;
        console.log("Fetched data:", fetchedData); // Output the fetched data

        return new Response(JSON.stringify(reqs.rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}
