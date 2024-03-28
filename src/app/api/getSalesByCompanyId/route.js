import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId } = body;

    const client = await pool.connect();

    try {
        // get rows from the request table for propertyId  with type_name, status_name, and creator username
        const reqs = await client.query(`
        SELECT * FROM sale WHERE old_owner_id = $1 ORDER BY sale_date
        `, [userId]);


        // return json string to client side
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
    } finally {
        client.release();
    }
}
