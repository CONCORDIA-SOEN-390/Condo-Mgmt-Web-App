import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { reviewerId } = body;

    try {
        
        let { data: requests, error } = await supabase
        .from('request')
        .select('*')
        .eq('req_reviewer', reviewerId)

        if (error != null){
            return new Response(JSON.stringify(error), {
              status:500,
            });
        }

        return new Response(JSON.stringify(requests), {
            status: 200
        });

    } catch (error) {
        console.error("Error:", error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}