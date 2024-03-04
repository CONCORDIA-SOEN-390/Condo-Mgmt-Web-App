import pool from "../../utils/db";

export default async function POST(req, res) {
  const { propertyName, address, numberOfUnits, numberOfFloors, numberOfUnitsPerFloor, numberOfParkingSpaces, numberOfLockers } = req.body;
  const owner_id = 1;

  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start the transaction

    // Insert data into table1
    const propertyResult = await client.query("INSERT INTO property(user_id, property_name) VALUES ($1, $2) RETURNING property_id", [1, propertyName]);

    //retrieve property id generated for use in future queries
    const propertyId = propertyResult.rows[0].property_id;

    for (let i = 0; i < numberOfUnits; i++) {
      await client.query("INSERT INTO unit(unit_id, property_id, owner_id, occupied, registration_key, condo_fee) VALUES ($1, $2, $3, $4, $5, $6)", [i, propertyId, owner_id, 0, "reg_key", 0]);
    }

    for (let i = 0; i < numberOfLockers; i++) {
      await client.query("INSERT INTO locker(locker_id, property_id, owner_id, condo_fee, occupied) VALUES ($1, $2, $3, $4, $5)", [i, propertyId, owner_id, 0, 0]);
    }

    await client.query("COMMIT"); // Commit the transaction
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback the transaction if an error occurs
    console.error("Error inserting data into tables:", error);
  } finally {
    client.release();
  }
}
