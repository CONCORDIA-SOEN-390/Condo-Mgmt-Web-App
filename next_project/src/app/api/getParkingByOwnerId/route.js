import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    try {
        const { ownerId, propertyId } = await req.json();

        const { data: parkings, error: parkingError } = await supabase
            .from('parking')
            .select('*')
            .eq('property_id', propertyId)
            .eq('owner_id', ownerId);



        if (parkingError) {
            return new Response(JSON.stringify(parkingError), {
                status: 500,
            });
        }

        return new Response(JSON.stringify(parkings), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
