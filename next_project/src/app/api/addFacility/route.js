// addFacility
import pool from "../../../utils/db";

export async function POST(req) {
  const body = await req.json();
  const { propertyId, name, description} = body;

  const client = await pool.connect();

  try {
    await client.query("INSERT INTO facility(property_id, name, description) VALUES ($1, $2, $3)", [propertyId, name, description]);

    return new Response('Success',{
      status:200,
    });
  } catch (error) {
    console.error("Error inserting data into tables:", error);
    return new Response('Internal Server Errror', {
      status:500,
    });
  } finally {
    client.release();
  }
}
