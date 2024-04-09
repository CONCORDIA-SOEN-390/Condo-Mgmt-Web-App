import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId } = body;

    const client = await pool.connect();

    try {
        const reqs = await client.query(`
        SELECT ru.*
        FROM req_update ru
        JOIN request r ON ru.req_id = r.req_id
        WHERE r.req_creator = $1;
        `, [userId]);

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