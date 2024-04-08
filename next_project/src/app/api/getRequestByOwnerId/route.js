import pool from "../../../../utils/db";

export async function POST(req) {
    try {
        const body = await req.json();
        const { userId, propertyId } = body; // Change ownerId to userId

        const client = await pool.connect();

        const reqs = await client.query(`
            SELECT
                request.req_id,
                request.unit_id,
                request.property_id,
                request.req_creator,
                users.username AS req_creator_username,
                request.details,
                request.req_reviewer,
                request.type_id,
                request.status_id,
                request_type.type_name, -- Include type_name from request_type table
                property.property_name, -- Include property_name from property table
                request_status.status_name -- Include status_name from request_status table
            FROM
                request
            INNER JOIN
                users ON request.req_creator = users.user_id
            INNER JOIN
                request_type ON request.type_id = request_type.type_id -- Join with request_type table
            INNER JOIN
                property ON request.property_id = property.property_id -- Join with property table
            INNER JOIN
                request_status ON request.status_id = request_status.status_id -- Join with request_status table
            WHERE
                request.property_id = $1
                AND request.req_creator = $2;
        `, [propertyId, userId]); // Change ownerId to userId and pass userId as parameter

        client.release();

        const fetchedData = reqs.rows;
        console.log("Fetched data:", fetchedData); // Output the fetched data

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
    }
}
