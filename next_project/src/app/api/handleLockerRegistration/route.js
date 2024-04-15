import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();
  const { propertyId, lockerOwnerId, lockerId } = body;

  try {
    console.log("HEEEELLLOOOOO");
    let { data: locker, error: lockerError } = await supabase
      .from("locker")
      .select("*")
      .eq("property_id", propertyId)
      .eq("locker_id", lockerId)
      .eq("occupied", false)
      .limit(1);

    if (lockerError) {
      return new Response(JSON.stringify(lockerError), {
        status: 500,
      });
    }

    if (locker.length === 0) {
      return new Response("Locker not found or already occupied", {
        status: 404,
      });
    }

    let { data: updateResult, error: updateError } = await supabase
      .from("locker")
      .update({ owner_id: lockerOwnerId, occupied: true })
      .eq("locker_id", lockerId)
      .eq("property_id", propertyId);

    if (updateError) {
      return new Response(JSON.stringify(updateError), {
        status: 500,
      });
    }

    return new Response("Locker registered successfully", {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
