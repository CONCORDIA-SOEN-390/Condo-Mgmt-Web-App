import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { propertyId, lockerId, fee } = body;

    try {
        if (fee >= 0){

            let { data : res, error } = await supabase
            .from('locker')
            .update({condo_fee: fee})
            .eq('locker_id', lockerId)
            .eq('property_id', propertyId)
            .select();

            if (error != null){
                return new Response(error, {
                  status:500,
                });
            }

            return new Response('Price updated successfully', {
                status: 200
            });
        } else {
            return new Response('Invalid fee', {
                status: 400,
            });
        }
    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
