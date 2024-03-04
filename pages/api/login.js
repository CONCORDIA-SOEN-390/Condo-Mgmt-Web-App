import pool from "../../utils/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body; // Assuming property_id is sent as a query parameter

    if (!email || !password) {
      res.status(400).json({ message: "Missing parameter" });
      return;
    }

    const client = await pool.connect();

    try {
      const user = await client.query(
        "SELECT * FROM users WHERE email=$1",[email]
      );
      if (user.rowCount != 1 || password != user.rows[0].password_){
        res.status(401).json({message: "Invalid Credentials"})
      } else {
        const response = user.rows[0]
        res.status(200).json({ response });
      }

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
