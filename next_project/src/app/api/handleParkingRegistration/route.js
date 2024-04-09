import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { propertyId, parkingOwnerId } = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); // Start the transaction

        const p = await client.query("SELECT * FROM parking WHERE occupied = false AND property_id = $1 LIMIT 1", [propertyId])

        if (p.rows.length === 0){
            return new Response('All spaces filled', {
                status: 400
            });
        }
        const parking_id = p.rows[0]['parking_id'];
        // update the request status
        await client.query("UPDATE parking SET owner_id = $1, occupied = true WHERE parking_id = $2", [parkingOwnerId, parking_id]);

        await client.query("COMMIT"); // commit the transaction
        return new Response('Parking updated succcessfully', {
            status: 200,
            parking_id: parking_id
        });

    } catch (error) {
        await client.query("ROLLBACK"); // rollback the transaction if an error occurs
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
}
