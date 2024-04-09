// /api/handleUpdateRequestStatus.js

import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { reviewerId } = body;

    const client = await pool.connect();

    try {
        const requests= await client.query("SELECT * FROM request WHERE req_reviewer = $1", [reviewerId]);

        return new Response(JSON.stringify(requests.rows), {
            status: 200
        });

    } catch (error) {
        console.error("Error:", error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
}