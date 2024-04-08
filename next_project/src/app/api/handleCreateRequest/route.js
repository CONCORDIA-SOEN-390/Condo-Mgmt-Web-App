import pool from "../../../../utils/db";

// used in request components
export async function POST(req){
    const body = await req.json();
    const { userId, requestTypeId, details, unitId } = body; // Remove propertyId from here

    const defaultStatusId = 1;
    const propertyId = body.propertyId; // Retrieve propertyId from the request body

    const client = await pool.connect();

    try {
        await client.query("BEGIN"); // Start the transaction
        await client.query("INSERT INTO request (unit_id, property_id, req_creator, type_id, status_id, details) VALUES ($1, $2, $3, $4, $5, $6)", [unitId, propertyId, userId, requestTypeId, defaultStatusId, details]);
        await client.query("COMMIT");
        return new Response('Success',{
            status:200,
        });
    } catch (error) {
        await client.query("ROLLBACK"); // Rollback the transaction if an error occurs
        console.error("Error inserting data into tables:", error);
        return new Response('Internal Server Errror', {
            status:500,
        });
    } finally {
        client.release();
    }
}
