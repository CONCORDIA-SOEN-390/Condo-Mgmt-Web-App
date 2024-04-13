import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    try {
        const body = await req.json();
        const { propertyId } = body;

        const { data: parkings, error } = await supabase
            .from('parking')
            .select('*')
            .eq('property_id', propertyId);

        if (error) {
            console.error('Error fetching lockers:', error);
            return new Response(JSON.stringify({ error: 'Failed to fetch lockers' }), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        const parkingCount = parkings ? parkings.length : 0;

        return new Response(JSON.stringify(parkingCount), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
