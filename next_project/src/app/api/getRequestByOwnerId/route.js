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
                creator.username AS req_creator_username,
                request.details,
                request.req_reviewer,
                reviewer.username AS req_reviewer_username,
                request.type_id,
                request.status_id,
                request_type.type_name,
                property.property_name,
                request_status.status_name
            FROM
                request
                    INNER JOIN
                users AS creator ON request.req_creator = creator.user_id
                    INNER JOIN
                users AS reviewer ON request.req_reviewer = reviewer.user_id
                    INNER JOIN
                request_type ON request.type_id = request_type.type_id
                    INNER JOIN
                property ON request.property_id = property.property_id
                    INNER JOIN
                request_status ON request.status_id = request_status.status_id
            WHERE
                request.property_id = $1
              AND request.req_creator = $2;

        `, [propertyId, userId]);

        client.release();

        const fetchedData = reqs.rows;
        //console.log("Fetched data:", fetchedData);

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
