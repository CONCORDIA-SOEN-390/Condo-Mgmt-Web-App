import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { propertyId, reservationDay } = body;

    const client = await pool.connect();

    try {
        const query = `
        SELECT facility_id, start_time, end_time
        FROM reservation
        WHERE property_id = $1 
            AND $2::DATE BETWEEN start_time::DATE AND end_time::DATE;
        `;
        const reservations = await client.query(query, [propertyId, reservationDay]);

        return new Response(JSON.stringify(reservations.rows), {
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

