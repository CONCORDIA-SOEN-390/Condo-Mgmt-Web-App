import pool from "../../../../utils/db";

export async function POST(req) {
  const body = await req.json();
  const { facilityId, propertyId, userId, startTime, endTime } = body; // Include userId in the destructuring

  const client = await pool.connect();

  try {

    if (endTime < startTime){
      return new Response('Bad Request: Reservation cannot end before it starts',{
        status:400,
      });
    }

    await client.query("INSERT INTO reservation (facility_id, property_id, user_id, start_time, end_time) VALUES ($1, $2, $3, $4, $5)", [facilityId, propertyId, userId, startTime, endTime]);

    return new Response('Success',{
      status:200,
    });
  } catch (error) {
    console.error("Error inserting data into tables:", error);
    return new Response('Internal Server Error', {
      status:500,
    });
  } finally {
    client.release();
  }
}
