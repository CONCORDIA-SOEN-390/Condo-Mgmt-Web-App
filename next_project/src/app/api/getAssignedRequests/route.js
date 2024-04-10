// /api/getAssignedRequests

import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId } = body;

    const client = await pool.connect();

    // i didnt want to make multiple api calls for table information
    try {
        const requests= await client.query(`
        SELECT request.*, request_type.type_name, request_status.status_name,
        users_creator.username AS creator_username, users_reviewer.username AS reviewer_username
        FROM request
            JOIN request_type ON request.type_id = request_type.type_id
            JOIN request_status ON request.status_id = request_status.status_id
            JOIN users AS users_creator ON request.req_creator = users_creator.user_id
            JOIN users AS users_reviewer ON request.req_reviewer = users_reviewer.user_id
        WHERE request.req_reviewer = $1;

        `, [userId]);
        //console.log('Fetched data:', requests.rows);

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