// import pool from "../../../../utils/db";
// import {auth} from "../../../lib/auth";
import { signIn } from "@/lib/auth";
import  pool  from "@/utils/db"
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body; // Assuming property_id is sent as a query parameter

  if (!email || !password) {
    return new Response("Missing Parameter", {
      status: 400,
    });
  }

  const client = await pool.connect();

  try {
    const user = await client.query("SELECT * FROM users WHERE email=$1", [email]);
    if (user.rowCount != 1 || password != user.rows[0].password_) {
      client.release();
      return new Response("Invalid Credentials", {
        status: 401,
      });
    // } else {
    //   // const userData = {
    //   //   id: user.rows[0].id,
    //   //   email: user.rows[0].email,
    //   //   profileUrl: user.rows[0].profile_picture_url,
    //   //   accountType: user.rows[0].account_type,
    //   //   phoneNumber: user.rows[0].phone_number,
    //   //   userName: user.rows[0].username,
    //   // };
      
    }
  } catch (error) {
    console.error("Error fetching units:", error);
    client.release();
    return new Response("Internal Server Error", {
      status: 500,
    });
  } 
  client.release();
  console.log("nooooooooooooooooooooooooooooooo")
  await signIn("credentials", { email, password, firstSignIn: false, redirectTo: "/"});
  
}
