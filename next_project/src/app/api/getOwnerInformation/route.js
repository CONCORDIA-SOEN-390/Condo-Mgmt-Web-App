import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { userId } = body;

    try {
        let { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('user_id', userId);

        if (error != null){
            return new Response(JSON.stringify(error), {
                status:500,
            });
        }

        console.log(users)

        return new Response(JSON.stringify(users), {
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
