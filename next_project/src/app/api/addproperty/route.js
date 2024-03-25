import pool from "../../../utils/db";
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export async function POST(req) {
  const body = await req.json();
  const { userId, propertyName, address, numberOfUnits, numberOfFloors, numberOfUnitsPerFloor, numberOfParkingSpaces, numberOfLockers } = body;

  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start the transaction

    // Insert data into table1
    const propertyResult = await client.query("INSERT INTO property(user_id, property_name) VALUES ($1, $2) RETURNING property_id", [1, propertyName]);

    //retrieve property id generated for use in future queries
    const propertyId = propertyResult.rows[0].property_id;
    let unit_id = "";

      for (let i = 1; i <= numberOfFloors; i++) {
        for (let j = 1; j <= numberOfUnitsPerFloor; j++) {
          
          if (numberOfUnitsPerFloor < 10) {
            unit_id = i + "" + j;
          } else {
            if (j < 10){
              unit_id += i + "0" + j;
            } else {
              unit_id += i + ""+  j;
            }
          }
          //Generation of unique registration key through this call to a library.
          const registrationKey = uuidv4();

          await client.query("INSERT INTO unit(unit_id, property_id, owner_id, occupied, registration_key, condo_fee) VALUES ($1, $2, $3, $4, $5, $6)", [unit_id, propertyId, userId, 0, registrationKey, 0]);
          unit_id = "";
        }
      }

    for (let i = 0; i < numberOfLockers; i++) {
      await client.query("INSERT INTO locker(locker_id, property_id, owner_id, condo_fee, occupied) VALUES ($1, $2, $3, $4, $5)", [i, propertyId, userId, 0, 0]);
    }

    for (let i = 0; i < numberOfParkingSpaces; i++) {
      await client.query("INSERT INTO parking(parking_id, property_id, owner_id, condo_fee, occupied) VALUES ($1, $2, $3, $4, $5)", [i, propertyId, userId, 0, 0]);
    }

    await client.query("COMMIT"); // Commit the transaction
    return new Response('Success',{
      status:200,
    });
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback the transaction if an error occurs
    console.error("Error inserting data into tables:", error);
    return new Response('Internal Server Errror', {
      status:500,
    });
  } finally {
    client.release();
  }
}
