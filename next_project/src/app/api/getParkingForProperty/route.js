import { createClient } from '@supabase/supabase-js';

// fetching all parking spots from property
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { propertyId } = body;

    try {
        let { data: parking, error } = await supabase
            .from('parking')
            .select('*')
            .eq('property_id', propertyId);

        if (error) {
            return new Response(JSON.stringify(error), {
                status: 500,
            });
        }

        console.log('Fetched data:', parking);

        return new Response(JSON.stringify(parking), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {
        console.error('Error:', error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
