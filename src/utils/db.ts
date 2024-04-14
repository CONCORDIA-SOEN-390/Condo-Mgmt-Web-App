import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost", // e.g., 'localhost'
  database: "db",
  password: "admin",
  port: 5433,
});

export default pool;