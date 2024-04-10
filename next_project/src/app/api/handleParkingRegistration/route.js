import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// added adding new locker logic in same api -> if parkingId does not exist -> can create one by submitting parkingId -> oppupied false by default
// update fee too
// assigning user to a parkingId
export async function POST(req) {
    const body = await req.json();
    const { parkingOwnerId, parkingId, parkingFee, propertyId } = body;

    try {
        await supabase.rpc('begin');

        let { data: existingParking, errorExisting } = await supabase
            .from('parking')
            .select('*')
            .eq('parking_id', parkingId)
            .eq('property_id', propertyId)
            .limit(1);

        if (errorExisting) {
            return new Response(JSON.stringify(errorExisting), {
                status: 500,
            });
        }

        if (!existingParking || existingParking.length === 0) {
            let { data: newParking, errorCreate } = await supabase
                .from('parking')
                .insert([
                    {
                        parking_id: parkingId,
                        property_id: propertyId,
                        occupied: false,
                        condo_fee: parkingFee || null,
                    },
                ]);

            if (errorCreate) {
                return new Response(JSON.stringify(errorCreate), {
                    status: 500,
                });
            }

            await supabase.rpc('commit');

            return new Response(JSON.stringify({
                message: 'New parking spot created successfully',
                status: 200,
                parking_id: parkingId,
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const parking_id = existingParking[0]['parking_id'];

        let { data: updatedParking, errorUpdate } = await supabase
            .from('parking')
            .update({
                owner_id: parkingOwnerId,
                occupied: true,
                condo_fee: parkingFee || null,
            })
            .eq('parking_id', parking_id)
            .single();

        if (errorUpdate) {
            return new Response(JSON.stringify(errorUpdate), {
                status: 500,
            });
        }

        await supabase.rpc('commit');

        return new Response(JSON.stringify({
            message: 'Parking updated successfully',
            status: 200,
            parking_id: parking_id,
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

    } catch (error) {

        await supabase.rpc('rollback');

        console.error('Error:', error);

        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
