import pool from "../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { email, username, num, userType, profileUrl} = body;

        if (!email || !username || !num || !userType || !profileUrl) {
            return new Response(email,{
                status:400,
              });
        }

        const client = await pool.connect();

        try {
            await client.query('BEGIN');
            const user = await client.query("UPDATE users SET username = $1 , phone_number = $2 , account_type = $3 , profile_picture_url=$4 WHERE email=$5", [username, num, userType, profileUrl, email]);
            await client.query('COMMIT');
            return new Response(email,{
                status:200,
              });
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Error Updating table:", error);
            return new Response('Internal Server Error',{
                status:500,
              });
        } finally {
            client.release();
        }
}