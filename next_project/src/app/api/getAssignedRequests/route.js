import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId } = body;

    const client = await pool.connect();

    try {
        const employeeQuery = await client.query(
            "SELECT employee_id FROM employee WHERE user_id = $1",
            [userId]
        );

        const employeeId = employeeQuery.rows[0]?.employee_id;

        if (!employeeId) {
            return new Response('Employee not found', { status: 404 });
        }

        const requestsQuery = await client.query(
            `SELECT
                 req.req_id,
                 req.unit_id,
                 req.property_id,
                 req.details,
                 creator.username AS req_creator_username,
                 reviewer.username AS req_reviewer_username,
                 type.type_name,
                 status.status_name
             FROM
                 request req
                     JOIN
                 users creator ON req.req_creator = creator.user_id
                     JOIN
                 employee emp ON req.req_reviewer = emp.employee_id
                     JOIN
                 users reviewer ON emp.user_id = reviewer.user_id
                     JOIN
                 request_type type ON req.type_id = type.type_id
                     JOIN
                 request_status status ON req.status_id = status.status_id
             WHERE
                 req.req_reviewer = $1


            `,
            [employeeId]
        );

        const requestData = requestsQuery.rows;
        console.log('Fetched data:', requestData);

        return new Response(JSON.stringify(requestData), {
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
