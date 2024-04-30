// /api/handleUpdateRequestStatus.js

import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { reviewerId, requestId, statusId, propertyId } = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); // Start the transaction

        // check if the property exists and belongs to the reviewer
        const propertyCheck = await client.query("SELECT * FROM property WHERE user_id = $1 AND property_id = $2", [reviewerId, propertyId]);

        if (propertyCheck.rows.length === 0) {
            return new Response("Error: Property not found or doesn't belong to the reviewer", {
                status: 404
            });
        }

        // check if the request exists
        const requestCheck = await client.query("SELECT * FROM request WHERE req_id = $1", [requestId]);

        if (requestCheck.rows.length === 0) {
            return new Response('Error: Request not found', {
                status: 404,
            });
        }

        // update the request status
        await client.query("UPDATE request SET status_id = $1 WHERE req_id = $2", [statusId, requestId]);

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
