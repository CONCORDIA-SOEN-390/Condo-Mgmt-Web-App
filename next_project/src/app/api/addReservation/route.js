import pool from "../../../utils/db";

export async function POST(req) {
  const body = await req.json();
  const { facilityId, propertyId, startTime, endTime} = body;

  const client = await pool.connect();

  try {

    if (endTime < startTime){
        return new Response('Bad Request: Reservation cannot end before it starts',{
            status:400,
        });
    }
    await client.query("INSERT INTO reservation (facility_id, property_id, start_time, end_time) VALUES ($1, $2, $3, $4)", [facilityId, propertyId, startTime, endTime]);

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
