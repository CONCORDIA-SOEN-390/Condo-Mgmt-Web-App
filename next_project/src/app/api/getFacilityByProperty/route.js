import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { propertyId } = body;

    const client = await pool.connect();

    try {
        const reqs = await client.query(`
        SELECT * FROM facility WHERE property_id = $1
        `, [propertyId]);

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
