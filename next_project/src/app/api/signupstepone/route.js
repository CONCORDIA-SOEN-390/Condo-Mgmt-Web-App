import pool from "../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { email, password } = body;

        if (!email || !password) {
            return new Response('Missing Parameter',{
                status:400,
              });
        }

        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const user = await client.query("INSERT INTO users (email, password_) VALUES ($1, $2) RETURNING user_id", [email, password]);
            const user_id = user.rows[0];
            await client.query('COMMIT');
            return new Response(user_id,{
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