import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { propertyId } = body;

    try {
        let { data: properties, error } = await supabase
            .from('income')
            .select('*')
            .eq('property_id', propertyId);

        if (error != null){
            return new Response(JSON.stringify(error), {
                status:500,
            });
        }


        return new Response(JSON.stringify(properties), {
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
