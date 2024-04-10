import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req){
    const body = await req.json();
    const {userId, regKey} = body;

    try {

        let { data : unit, error } = await supabase
        .from('unit')
        .select('*')
        .eq('registration_key', regKey);

        if (error != null){
            return new Response(error, {
              status:500,
            });
        }
        
        if (unit.length == 0) {

            return new Response('Key does not exist', {
                status:404,
              });

        } else {
            const unitId = unit[0]["unit_id"];

            let { data : res, errorUpdate } = await supabase
            .from('unit')
            .update({owner_id: userId, occupied: true})
            .eq('unit_id', unit[0]['unit_id'])
            .eq('property_id', unit[0]['property_id'])
            .select();

            if (errorUpdate != null){
                return new Response(JSON.stringify(error), {
                  status:500,
                });
            }

            return new Response('Registration key updated successfully', {
                status: 200
            });
        }
        
    } catch (error) {
        return new Response('Internal Server Errror', {
          status:500,
        });
      }
}