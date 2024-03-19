import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId, propertyId } = body;
  
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        
        const prop = await client.query("SELECT * FROM property WHERE user_id = $1 AND property_id = $2", [userId, propertyId]);
        
        if (prop.rows.length == 0){
          return new Response("Error fetching data", {
            status: 404
          });
        }

        const reqs = await client.query ("SELECT * FROM request WHERE property_id = $1", [propertyId]);

        return new Response(reqs.rows, {
          status: 200
        });
        
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback the transaction if an error occurs
        console.error("Error getting data from tables:", error);
        return new Response('Internal Server Errror', {
          status:500,
        });
      } finally {
        client.release();
      }
}