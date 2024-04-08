// Import necessary modules
import pool from "../../../../utils/db";
import { NextRequest, NextResponse } from "next/server";

// Define the route handler function
export async function GET(request: NextRequest) {
    const client = await pool.connect()

    try{
        const ownerId = request.nextUrl.searchParams.get("ownerId");
        console.log(ownerId);

        const result = await pool.query(`
            SELECT p.property_id, p.property_name
            FROM unit u
            INNER JOIN property p ON u.property_id = p.property_id
            WHERE u.owner_id = $1
        `, [ownerId]);



    return NextResponse.json(result.rows, { status: 200 });
} catch (error) {
    console.error("Error fetching units:", error);
    return NextResponse.json("Internal Server Error", {
        status: 500,
    });
} finally {
    client.release();
}
}
