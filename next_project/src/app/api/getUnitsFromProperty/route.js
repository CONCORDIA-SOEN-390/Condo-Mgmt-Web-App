import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    try {
        const { propertyId } = await req.json();

        const { data: units, error: unitError } = await supabase
            .from('unit')
            .select('*')
            .eq('property_id', propertyId);

        if (unitError) {
            return new Response(JSON.stringify(unitError), {
                status: 500,
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
