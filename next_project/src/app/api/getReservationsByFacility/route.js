import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { propertyId, reservationDay } = body;

    const nextDay = new Date(reservationDay);
    nextDay.setDate(nextDay.getDate() + 1);

    try {
        let { data: reservation, error } = await supabase
            .from('reservation')
            .select("*")
            .eq('facility_id', facilityId)
            .eq('property_id', propertyId)
            .gte('start_time', `${reservationDay}T00:00:00.000Z`)
            .lt('end_time', `${nextDay.toISOString().slice(0, 10)}T00:00:00.000Z`);

        if (error != null){
            return new Response(JSON.stringify(error), {
              status:500,
            });
        }
        
        return new Response(JSON.stringify(reservation), {

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

