import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { parkingId, propertyId } = body;


    try {

        let { data : res, error } = await supabase
        .from('parking')
        .update({owner_id: null, occupied: false})
        .eq('parking_id', parkingId)
        .eq('property_id', propertyId)
        .select();

        if (error != null){
            return new Response(error, {
              status:500,
            });
        }

        return new Response('Success', {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}