import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const property_id = searchParams.get("property_id"); // Assuming property_id is sent as a query parameter

  if (!property_id) {
    return Response.json("Missing property_id or unit_id parameter", {
      status: 400,
    });
  }

  //const client = await pool.connect();

  try {
    let { data: units, error } = await supabase
      .from("unit")
      .select("*")
      .eq("property_id", property_id);

    if (error != null) {
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(units), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("ASASDFAIEFOIJHN");
    return Response.json("Internal Server Error", {
      status: 500,
    });
  }
}
