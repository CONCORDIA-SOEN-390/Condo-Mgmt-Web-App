
import pool from "../../../../utils/db";


export async function POST(req) {
    try {
        const body = await req.json();
        const { reservationId } = body;

        const client = await pool.connect();

        await client.query('DELETE FROM reservation WHERE reservation_id = $1', [reservationId]);

        client.release();

        return new Response(JSON.stringify({ message: 'Reservation canceled successfully' }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {

        console.error("Error canceling reservation:", error);
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}
