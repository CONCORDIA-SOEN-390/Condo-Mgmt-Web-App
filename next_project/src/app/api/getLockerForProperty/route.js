import { createClient } from '@supabase/supabase-js';

// fetches all lockers from a property
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    try {
        const body = await req.json();
        const { propertyId } = body;

        const { data: lockers, error } = await supabase
            .from('locker')
            .select('*')
            .eq('property_id', propertyId);

        if (error) {
            console.error('Error fetching data:', error);
            return new Response(JSON.stringify(error), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        //console.log('Fetched data:', lockers);

        return new Response(JSON.stringify(lockers), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}
