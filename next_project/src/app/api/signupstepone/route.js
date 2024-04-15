import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export async function POST(req) {
    const body = await req.json();
    const { email, password } = body;

        if (!email || !password) {
            return new Response('Missing Parameter',{
                status:400,
            });
        }

        try {

            const { data, error } = await supabase
            .from('users')
            .insert([{ email: email, password_:  password},])
            .select();

            if (error != null){
                return new Response(JSON.stringify(error), {
                  status:500,
                });
            }

            let { data: user, error2 } = await supabase
            .from('users')
            .select('user_id')
            .eq('email', email);            
            const user_id = user[0]['user_id'];

            if (error2 != null){
                return new Response(JSON.stringify(error), {
                  status:500,
                });
            }

            return new Response(user_id,{
                status:200,
              });

              
        } catch (error) {
            await client.query('ROLLBACK');
            console.error("Error fetching units:", error);
            return new Response('Internal Server Error',{
                status:500,
              });
        }
}