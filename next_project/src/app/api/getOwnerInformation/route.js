import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export async function POST(req) {
    try {
        const body = await req.json();
        const { ownerId } = body;

        if (!ownerId) {
            return new Response('Missing ownerId parameter', {
                status: 400,
            });
        }

        // Fetch units based on ownerId
        const { data: units, error } = await supabase
            .from('unit')
            .select('*')
            .eq('owner_id', ownerId);

        if (error != null) {
            return new Response(JSON.stringify(error), {
                status: 500,
            });
        }



        // Fetch user details based on ownerId
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('username, email')
            .eq('user_id', ownerId);

        if (userError != null) {
            return new Response(JSON.stringify(userError), {
                status: 500,
            });
        }

        console.log('Fetched user details:', user);

        // Merge user details into units
        const unitsWithUserDetails = units.map(unit => {
            const { username, email } = user[0]; // Assuming only one user per ownerId
            return { ...unit, username, email };
        });

        console.log('Units with user details:', unitsWithUserDetails);

        return new Response(JSON.stringify(unitsWithUserDetails), {
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
