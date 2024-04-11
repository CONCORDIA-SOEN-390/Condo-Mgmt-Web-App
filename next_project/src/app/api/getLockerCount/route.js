import { createClient } from '@supabase/supabase-js';

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
            console.error('Error fetching lockers:', error);
            return {
                status: 500,
                body: JSON.stringify({ error: 'Failed to fetch lockers' })
            };
        }

        const lockerCount = lockers ? lockers.length : 0;

        return new Response(JSON.stringify(lockerCount), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error:', error);
        return {
            status: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
}
