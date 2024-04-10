import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { requestId, statusId } = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const requestCheck = await client.query("SELECT * FROM request WHERE req_id = $1", [requestId]);

        if (requestCheck.rows.length === 0) {
            return new Response('Error: Request not found', {
                status: 404,
            });
        }

        await client.query("UPDATE request SET status_id = $1 WHERE req_id = $2", [statusId, requestId]);

        await client.query("COMMIT");
        return new Response('Status updated successfully', {
            status: 200
        });

    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Error:", error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
}
