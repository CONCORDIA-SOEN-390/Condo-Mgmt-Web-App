import pool from "@/utils/db";
import { type NextRequest } from "next/server";

export default async function GET(request: NextRequest) {
  const client = await pool.connect();
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const results = await client.query(`SELECT * FROM properties where user_id = ${userId}`);
    return Response.json(results.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching units:", error);
    return Response.json("Internal Server Error", {
      status: 500,
    });
  } finally {
    client.release();
  }
}
