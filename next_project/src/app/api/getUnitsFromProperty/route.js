import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    try {
        const { propertyId } = await req.json();

        // Fetch unit data
        const { data: units, error: unitError } = await supabase
            .from('unit')
            .select('*')
            .eq('property_id', propertyId);

        if (unitError) {
            return new Response(JSON.stringify(unitError), {
                status: 500,
            });
        }

        // Fetch owner data separately
        const { data: owners, error: ownerError } = await supabase
            .from('users')
            .select('user_id', 'username', 'email')
            .in('user_id', units.map(unit => unit.owner_id)); // Filter users by owner_id from units

        if (ownerError) {
            return new Response(JSON.stringify(ownerError), {
                status: 500,
            });
        }

        // Combine unit data with owner information
        const combinedData = units.map(unit => {
            const owner = owners.find(owner => owner.user_id === unit.owner_id);
            return {
                ...unit,
                ownerName: owner ? owner.username : 'N/A', // Use 'N/A' if owner not found
                ownerEmail: owner ? owner.email : 'N/A',
            };
        });

        return new Response(JSON.stringify(combinedData), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}
