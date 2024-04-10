import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { ownerId } = body;


    try {

        let { data: fees, error } = await supabase
        .from('unit')
        .select('unit_id, property_id, condo_fee')
        .eq('owner_id', ownerId)
        .eq('occupied', true);

        if (error != null){
            return new Response(JSON.stringify(error), {
              status:500,
            });
        }

        return new Response(JSON.stringify(fees), {
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