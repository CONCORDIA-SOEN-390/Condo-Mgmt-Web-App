
import { NextResponse } from "next/server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export async function POST(req) {
  const body = await req.json();
  const { email, username, num, userType, profileUrl } = body;
  console.log(email, username, num, userType, profileUrl);

  if (!email || !username || !num || !userType || !profileUrl) {
    return new Response(email, {
      status: 400,
    });
  }


  try {
    const { data, error } = await supabase
      .from("users")
      .update({
        username: username,
        phone_number: num,
        account_type: userType,
        profile_picture_url: profileUrl,
      })
      .eq("email", email);
  } catch (error) {
    console.error("Error Updating table:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
  await signIn("credentials", { email, password: "", firstSignIn: true });
}
