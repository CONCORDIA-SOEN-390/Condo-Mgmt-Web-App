import pool from "../../../../utils/db";

export async function GET(req) {
    const client = await pool.connect();

    try {
        const statuses = await client.query("SELECT status_id, status_name FROM request_status");
        const data = statuses.rows.map(row => ({
            status_id: row.status_id,
            status_name: row.status_name
        }));
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error getting data from tables:", error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
}
