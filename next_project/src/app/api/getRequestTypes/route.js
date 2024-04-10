import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function GET(req){
    try {
      let { data: type, error } = await supabase
      .from('request_type')
      .select('*');
      
      if (error != null){
          return new Response(JSON.stringify(error), {
            status:500,
          });
      }

      return new Response(JSON.stringify(type), {
        status:200
      });
    } catch (error) {
      return new Response('Internal Server Errror', {
        status:500,
      });
    } 
}