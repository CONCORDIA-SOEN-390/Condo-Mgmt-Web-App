import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// added adding new locker logic in same api -> if lockerId does not exist -> can create one by submitting lockerId -> oppupied false by default
// update fee too
// assigning user to a lockerId
export async function POST(req) {
    const body = await req.json();
    const { lockerOwnerId, lockerId, lockerFee, propertyId } = body;

    try {
        await supabase.rpc('begin');

        let { data: existingLocker, errorExisting } = await supabase
            .from('locker')
            .select('*')
            .eq('locker_id', lockerId)
            .eq('property_id', propertyId)
            .limit(1);

        if (errorExisting) {
            return new Response(JSON.stringify(errorExisting), {
                status: 500,
            });
        }

        if (!existingLocker || existingLocker.length === 0) {
            let { data: newLocker, errorCreate } = await supabase
                .from('locker')
                .insert([
                    {
                        locker_id: lockerId,
                        property_id: propertyId,
                        occupied: false,
                        condo_fee: lockerFee || null,
                    },
                ]);

            if (errorCreate) {
                return new Response(JSON.stringify(errorCreate), {
                    status: 500,
                });
            }

            await supabase.rpc('commit');

            return new Response(JSON.stringify({
                message: 'New locker created successfully',
                status: 200,
                locker_id: lockerId,
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const locker_id = existingLocker[0]['locker_id'];

        let { data: updatedLocker, errorUpdate } = await supabase
            .from('locker')
            .update({
                owner_id: lockerOwnerId,
                occupied: true,
                condo_fee: lockerFee || null,
            })
            .eq('locker_id', locker_id)
            .single();

        if (errorUpdate) {
            return new Response(JSON.stringify(errorUpdate), {
                status: 500,
            });
        }

        await supabase.rpc('commit');

        return new Response(JSON.stringify({
            message: 'Locker updated successfully',
            status: 200,
            locker_id: locker_id,
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