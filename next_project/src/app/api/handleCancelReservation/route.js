import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { reservationId } = body;

    try {
        let { data: deletedReservation, error } = await supabase
            .from('reservation')
            .delete()
            .eq('reservation_id', reservationId);

        if (error != null){
            return new Response(JSON.stringify(error), {
                status:500,
            });
        }

        return new Response(JSON.stringify(deletedReservation), {
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
