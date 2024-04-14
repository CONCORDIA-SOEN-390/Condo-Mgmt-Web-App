import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";



export async function GET(req: NextRequest) {
    const body = await req.json();
    const {userId} = body;
    const client = await pool.connect();
    const user = await client.query("SELECT * FROM users WHERE UserID=$1", [userId]);
    if (user.rowCount != 1) {
        return new Response("User not found", {
            status: 404,
        });
    } else {
        const userData = {
            id: user.rows[0].id,
            email: user.rows[0].email,
            profileUrl: user.rows[0].profile_picture_url,
            accountType: user.rows[0].account_type,
            phoneNumber: user.rows[0].phone_number,
            userName: user.rows[0].username,
        };
        return new Response(JSON.stringify(userData), { status: 200 });
    }   
}