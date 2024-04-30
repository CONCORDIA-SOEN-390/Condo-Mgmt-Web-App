import pool from "../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { companyId, email, password, username, phoneNumber, employeeType } = body;

        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const company = await client.query("SELECT * FROM users WHERE account_type='company' AND user_id = $1", [companyId]);
            // const user_id = user.rows[0];
            const emp = await client.query("INSERT INTO users (username, email, password_, phone_number, profile_picture_url, account_type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id", [username, email, password, phoneNumber, company.rows[0].profile_picture_url, employeeType]);
            const emp_id = emp.rows[0]['user_id']
            await client.query("INSERT INTO employee (employee_id, company_id) VALUES ($1, $2)", [emp_id, companyId]);
            await client.query('COMMIT');
            return new Response('Success',{
                status:200,
              });
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Error fetching units:", error);
            return new Response('Internal Server Error',{
                status:500,
              });
        } finally {
            client.release();
          }
}