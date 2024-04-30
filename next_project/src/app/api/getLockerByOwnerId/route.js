import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    try {
        const { ownerId, propertyId } = await req.json();

        const { data: lockers, error: lockerError } = await supabase
            .from('locker')
            .select('*')
            .eq('property_id', propertyId)
            .eq('owner_id', ownerId);


        if (lockerError) {
            return new Response(JSON.stringify(lockerError), {
                status: 500,
            });
        }
        //console.log(lockers);

        return new Response(JSON.stringify(lockers), {
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
