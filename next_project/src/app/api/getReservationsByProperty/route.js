import pool from "../../../../utils/db";

export async function POST(req) {
    try {
        const body = await req.json();
        const { propertyId } = body;

        const client = await pool.connect();

        const reqs = await client.query(`
            SELECT
                r.*,
                f.name AS facility_name,
                u.username
            FROM
                reservation r
                    JOIN
                facility f ON r.facility_id = f.facility_id AND r.property_id = f.property_id
                    JOIN
                users u ON r.user_id = u.user_id
            WHERE
                r.property_id = $1;

        `, [propertyId]);

        client.release();
        //console.log("---------------------")
        //console.log(reqs.rows); // Output the result in the console

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
