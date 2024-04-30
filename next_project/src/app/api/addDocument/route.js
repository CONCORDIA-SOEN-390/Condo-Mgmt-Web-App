import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();
  const { propertyId, url, title} = body;

  try {

    const { data, error } = await supabase
    .from('file_')
    .insert([
    {property_id: propertyId, file_data: url, title: title},
    ])
    .select();

    if (error != null){
      return new Response(JSON.stringify(error), {
        status:500,
      });
    }
    return new Response(JSON.stringify({ message: 'Success' }), {
        status: 200
    });
  } catch (error) {
    return new Response('Internal Server Errror', {
      status:500,
    });
  }
}