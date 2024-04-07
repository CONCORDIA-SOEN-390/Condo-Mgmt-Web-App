import pool from "../../../../utils/db";

export async function POST(req) {
    try {
        const body = await req.json();
        const { propertyId } = body;

        const client = await pool.connect();
        const reqs = await client.query('SELECT * FROM facility WHERE property_id = $1', [propertyId]);

        console.log('Fetched data:', reqs.rows);

        client.release();

        return new Response(JSON.stringify(reqs.rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}
