import pool from "../../../utils/db";

export async function POST(req){
    const body = await req.json();
    const {reviewerId, requestId, statusId, propertyId} = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); // Start the transaction

        const prop = await client.query("SELECT * FROM property WHERE user_id = $1 AND property_id = $2", [reviewerId, propertyId]);
        
        if (prop.rows.length == 0){
          return new Response("Error fetching data", {
            status: 404
          });
        }
        
        const req = await client.query(
            "SELECT * FROM request WHERE req_id = $1",
            [requestId]
        );
        
        if (req.length == 0) {
            return new Response('Request does not exist', {
                status:404,
            });
        } else {
            await client.query(
                "UPDATE request SET status_id = $1 WHERE req_id = $2",
                [statusId, requestId]
            );

            await client.query("COMMIT"); // Commit the transaction
            return new Response('Status updated successfully', {
                status: 200
            });
        }
        
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback the transaction if an error occurs
        console.error("Error:", error);
        return new Response('Internal Server Errror', {
          status:500,
        });
      } finally {
        client.release();
      }
}