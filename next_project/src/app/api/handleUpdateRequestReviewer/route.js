import pool from "../../../../utils/db";

export async function POST(req) {
    try {
        const body = await req.json();
        const { requestId, newReviewerId } = body;

        const client = await pool.connect();

        const reqs = await client.query(
            `
            UPDATE request
            SET req_reviewer = $1
            WHERE req_id = $2
        `, [newReviewerId, requestId]);

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
        console.error('Error updating reviewer:', error);
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}
