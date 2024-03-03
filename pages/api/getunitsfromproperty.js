import pool from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { property_id } = req.query; // Assuming property_id is sent as a query parameter

    if (!property_id) {
      res.status(400).json({ message: "Missing property_id parameter" });
      return;
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
      res.status(200).json({ units });
    } catch (error) {
      console.error("Error fetching units:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      client.release();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
