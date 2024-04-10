import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function POST(req) {
  const body = await req.json();
  const { facilityId, propertyId, userId, startTime, endTime} = body;

  try {

    if (endTime < startTime){
        return new Response('Bad Request: Reservation cannot end before it starts',{
            status:400,
        });
    }

    const { data, error } = await supabase
    .from('reservation')
    .insert([
      { facility_id: facilityId, property_id: propertyId, user_id: userId, start_time: startTime, end_time: endTime },
    ])
    .select();

    if (error != null){
      return new Response(JSON.stringify(error), {
        status:500,
      });
    }
  
    return new Response('Success',{
      status:200,
    });
  } catch (error) {
    console.error("Error inserting data into tables:", error);
    return new Response('Internal Server Errror', {
      status:500,
    });
  }
}
