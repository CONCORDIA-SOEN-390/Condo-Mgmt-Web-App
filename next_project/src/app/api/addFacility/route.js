import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  const body = await req.json();
  const { propertyId, name, description} = body;

  try {
    
const { data, error } = await supabase
.from('facility')
.insert([
  {property_id: propertyId, name: name, description: description},
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
    return new Response('Internal Server Errror', {
      status:500,
    });
  }
}
