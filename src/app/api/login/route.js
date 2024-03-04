import pool from "../../../../utils/db";

export async function POST(req) {
  const body = await req.json();
    const { email, password } = body; // Assuming property_id is sent as a query parameter

    if (!email || !password) {
      return new Response('Missing Parameter',{
        status:400,
      });
    }

    const client = await pool.connect();

    try {
      const user = await client.query(
        "SELECT * FROM users WHERE email=$1",[email]
      );
      if (user.rowCount != 1 || password != user.rows[0].password_){
        return new Response('Invalid Credentials',{
          status:401,
        });
      } else {
        const response = user.rows[0];
        console.log(response)
        return new Response(response,{
          status:200,
        });
      }

    } catch (error) {
      console.error("Error fetching units:", error);
      return new Response('Internal Server Error',{
        status:500,
      });
    } finally {
      client.release();
    }
}
