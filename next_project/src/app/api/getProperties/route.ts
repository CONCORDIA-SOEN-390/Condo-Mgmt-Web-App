import pool from "../../../../utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const client = await pool.connect();
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const results = await client.query(`SELECT *, address, dimension, number_units,
       number_floors, parking_count, locker_count FROM property WHERE user_id = $1`, [userId]);

    // debug
    // console.log("Fetched data:", results.rows);

    return NextResponse.json(results.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching units:", error);
    return NextResponse.json("Internal Server Error", {
      status: 500,
    });
  } finally {
    client.release();
  }
}