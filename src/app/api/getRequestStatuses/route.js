import pool from "../../../utils/db";

export async function GET(req){
    const client = await pool.connect();

    try {
        const statuses = await client.query("SELECT * FROM request_status");
        return new Response(statuses.rows, {
            status:200
        })
    } catch (error) {
        console.error("Error getrting data from tables:", error);
        return new Response('Internal Server Errror', {
          status:500,
        });
      } finally {
        client.release();
      }
}