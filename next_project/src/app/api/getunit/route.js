import pool from "../../../../utils/db";

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const property_id = searchParams.get('property_id');

  if (!property_id) {
    return new Response(JSON.stringify('Missing property_id parameter'), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const client = await pool.connect();

  try {
    // Fetch details of the specified unit for the given property_id using a parameterized query
    const unitResult = await client.query(
      'SELECT * FROM unit WHERE property_id = $1',
      [property_id]
    );

    const unit = unitResult.rows[0];

    if (!unit) {
      return new Response(JSON.stringify('Unit Not Found'), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(unit), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Error fetching unit details:", error);
    return new Response(JSON.stringify('Internal Server Error'), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } finally {
    client.release();
  }
}