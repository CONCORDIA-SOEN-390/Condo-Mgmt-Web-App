import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId, propertyId, parkingId, fee } = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); // Start the transaction

        // check if the property exists and belongs to the user
        const propertyCheck = await client.query("SELECT * FROM property WHERE user_id = $1 AND property_id = $2", [userId, propertyId]);

        if (propertyCheck.rows.length === 0) {
            return new Response("Error: Property not found or doesn't belong to the user", {
                status: 404
            });
        }

        // check if the parking exists
        const parkingCheck = await client.query("SELECT * FROM parking WHERE parking_id = $1 AND property_id = $2", [parkingId, propertyId]);
        
        if (parkingCheck.rows.length === 0) {
            return new Response('Error: parking not found', {
                status: 404,
            });
        }
        
        if (fee >= 0){
            await client.query("UPDATE parking SET condo_fee = $1 WHERE parking_id = $2 AND property_id = $3", [fee, parkingId, propertyId]);
            await client.query("COMMIT"); // commit the transaction
            return new Response('Price updated successfully', {
                status: 200
            });
        } else {
            return new Response('Invalid fee', {
                status: 400,
            });
        }
    } catch (error) {
        await client.query("ROLLBACK"); // rollback the transaction if an error occurs
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
}
