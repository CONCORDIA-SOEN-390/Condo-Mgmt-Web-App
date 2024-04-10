import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { companyId } = body;
    try {
        let { data: expenses, error } = await supabase
        .from('expense')
        .select('*')
        .eq('company_id', companyId)

        if (error != null){
            return new Response(JSON.stringify(error), {
              status:500,
            });
        }
        
        return new Response(JSON.stringify(expenses), {
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
