// /api/getRequestsByProperty.js
import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId, propertyId } = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // check if property exists
        const prop = await client.query("SELECT * FROM property WHERE user_id = $1 AND property_id = $2", [userId, propertyId]);

        if (prop.rows.length === 0) {
            return new Response("Error fetching property data", {
                status: 404
            });
        }

        // get rows from the request table for propertyId  with type_name, status_name, and creator username
        const reqs = await client.query(`
            SELECT
                request.req_id,
                request.unit_id,
                request.property_id,
                property.property_name,
                users.username as req_creator_username,
                request.req_creator,
                request_type.type_name,
                request_status.status_name,
                request.details
            FROM
                request
                    INNER JOIN
                request_type ON request.type_id = request_type.type_id
                    INNER JOIN
                request_status ON request.status_id = request_status.status_id
                    INNER JOIN
                users ON request.req_creator = users.user_id
                    INNER JOIN
                property ON request.property_id = property.property_id
            WHERE
                request.property_id = $1
        `, [propertyId]);

        // commit the transaction
        await client.query("COMMIT");

        // return json string to client side
        return new Response(JSON.stringify(reqs.rows), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        await client.query("ROLLBACK"); // Rollback the transaction if an error occurs
        console.error("Error getting data from tables:", error);
        return new Response('Internal Server Error', {
            status: 500
        });
    } finally {
        client.release();
    }
}
