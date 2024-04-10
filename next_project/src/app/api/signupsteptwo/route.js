import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { email, username, num, userType, profileUrl} = body;

    if (!email || !username || !num || !userType || !profileUrl) {
        return new Response(email,{
            status:400,
            });
    }

    try {

        let { data : res, errorUpdate } = await supabase
        .from('users')
        .update({username: username, phone_number: num , account_type: userType , profile_picture_url: profileUrl})
        .eq('email', email)
        .select();

        if (errorUpdate != null){
            return new Response(JSON.stringify(error), {
                status:500,
            });
        }

        
        return new Response('Success',{
            status:200,
        });

    } catch (error) {
        return new Response('Internal Server Error',{
            status:500,
        });
    }
}