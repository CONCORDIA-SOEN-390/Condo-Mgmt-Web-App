import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);


export async function POST(req) {
    const body = await req.json();
    const {  propertyId, parkingOwnerId, parkingId, } = body;

    try {
        await supabase.rpc('begin');

        let {data: parking, error: parkingError} = await supabase
            .from('parking')
            .select('*')
            .eq('parking_id', parkingId)
            .eq('occupied', false)
            .limit(1);

        if (parkingError) {
            return new Response(JSON.stringify(parkingError), {
                status: 500,
            });
        }

        if (parking.length === 0) {
            return new Response('Parking not found or already occupied', {
                status: 404,
            });
        }

        let { data: updateResult, error: updateError } = await supabase
            .from('parking')
            .update({ owner_id: parkingOwnerId, occupied: true })
            .eq('parking_id', parkingId)
            .eq('property_id', propertyId);

        if (updateError) {
            return new Response(JSON.stringify(updateError), {
                status: 500,
            });
        }
        return new Response('Locker registered successfully', {
            status: 200,
        });
    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }

}
