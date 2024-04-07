// getReservationByProperty
import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { facilityId, propertyId, reservationDay } = body;

    const client = await pool.connect();

    try {
        const reqs = await client.query(`
        SELECT * FROM reservation WHERE facility_id = $1 AND property_id = $2 AND $3::DATE BETWEEN start_time::DATE AND end_time::DATE;
        `, [facilityId, propertyId, reservationDay]);

        return new Response(JSON.stringify(reqs.rows), {
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
