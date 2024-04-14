import pool from "../../../utils/db";
import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, username, num, userType, profileUrl } = body;
  console.log(email, username, num, userType, profileUrl);

  if (!email || !username || !num || !userType || !profileUrl) {
    return new Response(email, {
      status: 400,
    });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("UPDATE users SET username = $1 , phone_number = $2 , account_type = $3 , profile_picture_url=$4 WHERE email=$5", [username, num, userType, profileUrl, email]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error Updating table:", error);
    client.release();
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
  client.release();
  await signIn("credentials", { email, password: "", firstSignIn: true});
  
  
}
