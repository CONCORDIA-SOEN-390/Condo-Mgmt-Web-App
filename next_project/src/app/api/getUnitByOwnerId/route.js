import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    try {
        const { userId, propertyId } = await req.json();

        const { data: units, error } = await supabase
            .from('unit')
            .select('*')
            .eq('owner_id', userId)
            .eq('property_id', propertyId);

        if (error) {
            return new Response(JSON.stringify(error), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        return new Response(JSON.stringify(units), {
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
