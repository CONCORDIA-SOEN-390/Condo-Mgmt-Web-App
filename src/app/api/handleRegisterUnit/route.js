import pool from "../../../utils/db";

export async function POST(req){
    const body = await req.json();
    const {userId, regKey} = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); // Start the transaction

        const unit = await client.query(
            "SELECT * FROM unit WHERE registration_key = $1",
            [regKey]
        );
        
        if (unit.length == 0) {
            return new Response('Key does not exist', {
                status:404,
              });
        } else {
            const unitId = unit['rows'][0]["unit_id"];
            await client.query(
                "UPDATE unit SET owner_id = $1 WHERE unit_id = $2",
                [userId, unitId]
            );

            await client.query("COMMIT"); // Commit the transaction
            return new Response('Registration key updated successfully', {
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