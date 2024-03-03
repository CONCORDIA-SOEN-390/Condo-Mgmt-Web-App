import pool from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { property_id, unit_id } = req.query;

    if (!property_id || !unit_id) {
      res
        .status(400)
        .json({ message: "Missing property_id or unit_id parameter" });
      return;
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
        res.status(404).json({ message: "Unit not found" });
        return;
      }

      // You can handle the retrieved unit details as needed (e.g., send them in the response)
      res.status(200).json({ unit });
    } catch (error) {
      console.error("Error fetching unit details:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      client.release();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
