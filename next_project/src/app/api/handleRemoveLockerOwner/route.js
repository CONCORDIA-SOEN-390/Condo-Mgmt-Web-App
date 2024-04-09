import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { lockerId, propertyId } = body;

    const client = await pool.connect();

    try {
        await client.query(`
        UPDATE locker SET owner_id = null, occupied = false WHERE locker_id = $1 AND property_id = $2
        `, [lockerId, propertyId]);

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