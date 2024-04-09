// /api/handleUpdateRequestStatus.js

import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { reviewerId, requestId, statusId } = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); // Start the transaction

        // check if the request exists
        const requestCheck = await client.query("SELECT * FROM request WHERE req_id = $1 AND req_reviewer = $2", [requestId, reviewerId]);

        if (requestCheck.rows.length === 0) {
            return new Response('Error: Request not found', {
                status: 404,
            });
        }

        // update the request status
        await client.query("UPDATE request SET status_id = $1, req_reviewer = $2 WHERE req_id = $3", [statusId, null, requestId]);

        // update the employee to decrease their assigned req count
        await client.query("UPDATE employee SET num_of_assigned_req = num_of_assigned_req - 1 WHERE employee_id = $1", [reviewerId]);

        await client.query("COMMIT"); // commit the transaction
        return new Response('Status updated successfully', {
            status: 200
        });

    } catch (error) {
        await client.query("ROLLBACK"); // rollback the transaction if an error occurs
        console.error("Error:", error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
}
