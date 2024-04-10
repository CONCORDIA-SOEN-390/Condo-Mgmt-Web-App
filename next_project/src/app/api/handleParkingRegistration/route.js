import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { propertyId, parkingOwnerId } = body;


    try {

        let { data : parking, error } = await supabase
        .from('parking')
        .select('*')
        .eq('property_id', propertyId)
        .eq('occupied', false);

        if (error != null){
            return new Response(error, {
              status:500,
            });
        }

        if (parking.length === 0){
            return new Response('All spaces filled', {
                status: 400
            });
        }
        const parking_id = parking[0]['parking_id'];
        // update the request status
        let { data : res, errorUpdate } = await supabase
        .from('parking')
        .update({owner_id: parkingOwnerId, occupied: true})
        .eq('parking_id', parking_id)
        .eq('property_id', parking[0]['property_id'])
        .select();

        if (errorUpdate != null){
            return new Response(JSON.stringify(error), {
              status:500,
            });
        }
        return new Response('parking updated succcessfully', {
            status: 200,
        });

    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
