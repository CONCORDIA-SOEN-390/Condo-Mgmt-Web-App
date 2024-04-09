import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { propertyId, lockerOwnerId, lockerId, lockerFee } = body;

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const p = await client.query("SELECT * FROM locker WHERE occupied = false AND property_id = $1 LIMIT 1", [propertyId]);

        if (p.rows.length === 0){
            return new Response('All spaces filled', {
                status: 400
            });
        }
        const locker_id = p.rows[0]['locker_id'];
        await client.query("UPDATE locker SET owner_id = $1, occupied = true, condo_fee = $2 WHERE locker_id = $3", [lockerOwnerId, lockerFee, locker_id]);

        await client.query("COMMIT");
        return new Response(JSON.stringify({
            message: 'Locker updated successfully',
            status: 200,
            locker_id: locker_id
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        await client.query("ROLLBACK");
        return new Response('Internal Server Error', {
            status: 500,
        });
    } finally {
        client.release();
    }
}
