import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { userId, propertyId, unitId, sqft, pricePerSqft } = body;

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

        // check if the request exists
        const unitCheck = await client.query("SELECT * FROM unit WHERE unit_id = $1 AND property_id = $2", [unitId, propertyId]);

        if (unitCheck.rows.length === 0) {
            return new Response('Error: Unit not found', {
                status: 404,
            });
        }

        // update the request status
        if (sqft > 0 && pricePerSqft > 0){
            await client.query("UPDATE unit SET square_footage = $1, price_per_square_foot = $2 WHERE unit_id = $3 AND property_id = $4", [sqft, pricePerSqft, unitId, propertyId]);
            await client.query("COMMIT"); // commit the transaction
            return new Response('Status updated successfully', {
                status: 200
            });
        } else {
            return new Response('Invalid square footage or price', {
                status: 400,
            });
        }
    } catch (error) {
        await client.query("ROLLBACK"); // rollback the transaction if an error occurs
        console.error("Error:", error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
}
