import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Used in reservations to get an owner's property from the unit table
export async function POST(req) {
    try {
        const { userId } = await req.json();

        const { data: properties, error } = await supabase
            .from('unit')
            .select('property_id, property(*)')
            .eq('owner_id', userId);

        if (error) {
            return new Response(JSON.stringify(error), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify(properties), {
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
