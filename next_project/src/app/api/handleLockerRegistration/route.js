import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();
  const { propertyId, lockerOwnerId } = body;

  try {
    let { data: locker, error } = await supabase
      .from("locker")
      .select("*")
      .eq("property_id", propertyId)
      .eq("occupied", false);

    if (error != null) {
      console.log("HELLOOOO");
      return new Response(error, {
        status: 500,
      });
    }

    if (locker.length === 0) {
      return new Response("All spaces filled", {
        status: 400,
      });
    }
    const locker_id = locker[0]["locker_id"];
    // update the request status
    let { data: res, errorUpdate } = await supabase
      .from("locker")
      .update({ owner_id: lockerOwnerId, occupied: true })
      .eq("locker_id", locker_id)
      .eq("property_id", locker[0]["property_id"])
      .select();

    if (errorUpdate != null) {
      return new Response(JSON.stringify(error), {
        status: 500,
      });
    }
    return new Response("Locker updated succcessfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
