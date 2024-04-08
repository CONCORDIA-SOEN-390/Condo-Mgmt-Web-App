import pool from "../../../../utils/db";

export async function POST(req) {
    try {

        const body = await req.json();
        const { propertyId } = body;

        const client = await pool.connect();

        const reqs = await client.query(
            `
                SELECT e.employee_id, u.username, j.job_description
                FROM employee e
                         JOIN users u ON e.user_id = u.user_id
                         JOIN jobs j ON e.job_id = j.job_id
                WHERE e.property_id = $1

            `

               , [propertyId]  );

        client.release();

        const fetchedData = reqs.rows;
        console.log("Fetched data:", fetchedData);

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
