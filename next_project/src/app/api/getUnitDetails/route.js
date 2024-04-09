import pool from "../../../../utils/db";

export async function POST(req) {
    const body = await req.json();
    const { unitId, propertyId } = body;

    const client = await pool.connect();

    try {
        const reqs = await client.query(`
        SELECT * FROM unit u
        JOIN property p ON u.property_id = p.property_id
        WHERE u.unit_id = $1 AND u.property_id = $2
        `, [unitId, propertyId]);

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
