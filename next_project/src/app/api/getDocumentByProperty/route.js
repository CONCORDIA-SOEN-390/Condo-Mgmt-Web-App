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
        let { data: documents, error } = await supabase
            .from('file_')
            .select('*')
            .eq('property_id', propertyId);

        console.log(documents);

        if (error != null){
            return new Response(JSON.stringify(error), {
                status:500,
            });
        }

        console.log(documents);

        return new Response(JSON.stringify(documents), {
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
