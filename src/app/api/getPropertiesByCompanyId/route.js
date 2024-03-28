// /api/getRequestsByProperty.js
import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId } = body;

    const client = await pool.connect();

    try {
        const prop = await client.query("SELECT * FROM property WHERE user_id = $1", [userId]);

        
        return new Response(JSON.stringify(prop.rows), {
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
