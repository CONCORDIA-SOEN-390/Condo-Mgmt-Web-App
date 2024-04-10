import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { unitId, propertyId } = body;

    try {
        let { data: unit, error } = await supabase
        .from('unit')
        .select('*')
        .eq('property_id', propertyId)
        .eq('unit_id', unitId);
      
      if (error != null){
          return new Response(JSON.stringify(error), {
            status:500,
          });
      }

      return Response.json(JSON.stringify(unit), {
        status:200,
      });
    } catch (error) {
      return Response.json('Internal Server Error', {
        status: 500,
      });
    }
}
