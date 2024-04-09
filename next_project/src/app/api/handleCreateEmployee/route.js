import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { email, password, username, phoneNumber, employeeType, profileUrl, jobDescription, propertyId } = body;

    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        // Insert users table
        const userQuery = `
            INSERT INTO users (username, email, password_, phone_number, profile_picture_url, account_type)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING user_id`;
        const userValues = [username, email, password, phoneNumber, profileUrl, employeeType];
        const userResult = await client.query(userQuery, userValues);
        const userId = userResult.rows[0].user_id;

        // Insert employee table
        const employeeQuery = `
            INSERT INTO employee (user_id, job_id, property_id)
            VALUES ($1, (SELECT job_id FROM jobs WHERE job_description = $2), $3)
            RETURNING employee_id`;
        const employeeValues = [userId, jobDescription, propertyId];
        await client.query(employeeQuery, employeeValues);

        await client.query('COMMIT');

        return new Response('Success', {
            status: 200,
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error("Error inserting data:", error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
}
