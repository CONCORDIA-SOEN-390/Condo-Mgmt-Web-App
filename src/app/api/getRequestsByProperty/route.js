// /api/getRequestsByProperty.js
import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId, propertyId } = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        // Check if property exists
        const prop = await client.query("SELECT * FROM property WHERE user_id = $1 AND property_id = $2", [userId, propertyId]);

        if (prop.rows.length === 0) {
            return new Response("Error fetching property data", {
                status: 404
            });
        }

        // Fetch all rows from the request table for the given propertyId along with type_name and status_name
        const reqs = await client.query(`
            SELECT 
                request.req_id,
                request.unit_id,
                request.property_id,
                request.req_creator,
                request.req_reviewer,
                request_type.type_name,
                request_status.status_name, -- selecting status_name from request_status table
                request.details
            FROM 
                request
            INNER JOIN 
                request_type ON request.type_id = request_type.type_id
            INNER JOIN
                request_status ON request.status_id = request_status.status_id
            WHERE 
                request.property_id = $1
        `, [propertyId]);

        // Commit the transaction
        await client.query("COMMIT");

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
