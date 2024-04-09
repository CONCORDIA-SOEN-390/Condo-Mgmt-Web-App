import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { parkingId, propertyId } = body;

    const client = await pool.connect();

    try {
        await client.query(`
        UPDATE parking SET owner_id = null, occupied = false WHERE parking_id = $1 AND property_id = $2
        `, [parkingId, propertyId]);

        return new Response('Success', {
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