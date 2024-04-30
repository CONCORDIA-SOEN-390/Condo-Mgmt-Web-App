import { NextRequest, NextResponse } from "next/server";
import pool from "@/utils/db";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function GET(req) {
  const body = await req.json();
  const { userId } = body;
  const { data, error } = await supabase.from("users").select("*").eq("UserID", userId).single(); // Use 'single()' to ensure only one record is returned or null if not found
  if (user.length != 1) {
    return new Response("User not found", {
      status: 404,
    });
  } else {
    const userData = {
      id: user.id,
      email: user.email,
      profileUrl: user.profile_picture_url,
      accountType: user.account_type,
      phoneNumber: user.phone_number,
      userName: user.username,
    };
    return new Response(JSON.stringify(userData), { status: 200 });
  }
}
