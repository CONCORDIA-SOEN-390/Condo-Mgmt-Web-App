import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
export async function POST(req) {
    const body = await req.json();
    const { userId, pageType } = body;
    let allowAccess = false;

    try {
        let { data: user, error } = await supabase
        .from('users')
        .select("*")
        .eq('user_id', userId);
        const account_type= user[0]['account_type'];
        switch (account_type){
            case 'company':
                allowAccess = true;
                break;
            case 'management':
                if (pageType != 'properties'){
                    allowAccess = true;
                }
                break;
            case 'finance':
                if (pageType === 'finance'){
                    allowAccess = true;
                }
                break;
            case 'operations':
                if (pageType === 'requests'){
                    allowAccess = true;
                }
                break;
            case 'reg_user':
                allowAccess = true;
                break;
        }
        return new Response(allowAccess,{
            status:200,
        });
    } catch (error) {
        return new Response('Internal Server Error',{
            status:500,
        });
    }
}