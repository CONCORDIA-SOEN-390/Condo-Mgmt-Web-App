import pool from "../../../../utils/db";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const property_id= searchParams.get('property_id');
  const unit_id= searchParams.get('unit_id');


    if (!property_id || !unit_id) {
      return Response.json('Missing property_id or unit_id parameter', {
        status:400,
      });;
    }

    const client = await pool.connect();

    try {
      // Fetch details of the specified unit for the given property_id
      const unitResult = await client.query(
        "SELECT * FROM unit WHERE property_id = $1 AND unit_id = $2",
        [property_id, unit_id]
      );

      const unit = unitResult.rows[0];

      // Check if the unit was found
      if (!unit) {
        return Response.json('Unit Not Found', {
          status:404,
        });
      }

      // You can handle the retrieved unit details as needed (e.g., send them in the response)
      return Response.json(unit, {
        status:200,
      });
    } catch (error) {
      console.error("Error fetching unit details:", error);
      return Response.json('Internal Server Error', {
        status: 500,
      });
    } finally {
      client.release();
    }
}
