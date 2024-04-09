import pool from "../../../../utils/db";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export async function POST(req) {
    const body = await req.json();
    const { unitId, propertyId } = body;
    const registrationKey = uuidv4();

    const client = await pool.connect();

    try {
        await client.query(`
        UPDATE unit SET owner_id = null, occupied = false, registration_key = $1 WHERE unit_id = $2 AND property_id = $3
        `, [registrationKey, unitId, propertyId]);

        return new Response('Success', {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500
        });
    } finally {
        client.release();
    }
}