import pool from "../../../../utils/db";

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const property_id= searchParams.get('property_id'); // Assuming property_id is sent as a query parameter

    if (!property_id) {
      return Response.json('Missing property_id or unit_id parameter', {
        status:400,
      });
    }

    const client = await pool.connect();

    try {
      // Fetch all units for the given property_id
      const unitsResult = await client.query(
        "SELECT * FROM unit WHERE property_id = $1",
        [property_id]
      );

      const units = unitsResult.rows;

      // You can handle the retrieved units as needed (e.g., send them in the response)
      return Response.json(units, {
        status:200}
        );
    } catch (error) {
      console.error("Error fetching units:", error);
      return Response.json('Internal Server Error', {
        status: 500,
      });
    } finally {
      client.release();
    }
}
