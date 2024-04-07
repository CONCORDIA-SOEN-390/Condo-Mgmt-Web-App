import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost", // e.g., 'localhost'
  database: "cap",
  password: "vanisha",
  port: 5432,
});

export default pool;
