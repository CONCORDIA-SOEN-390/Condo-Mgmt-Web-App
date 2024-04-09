import pool from "../../../../utils/db";

export async function GET(req) {
    try {
        const client = await pool.connect();
        const jobs = await client.query('SELECT job_id, job_description FROM jobs');

        client.release();
        const responseData = jobs.rows.map(job => ({
            job_id: job.job_id,
            job_description: job.job_description
        }));

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {

        console.error("Error fetching jobs:", error);
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}
