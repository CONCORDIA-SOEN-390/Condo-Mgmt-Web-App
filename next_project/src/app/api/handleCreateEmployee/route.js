import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { propertyId, email, password_, username, phoneNumber, employeeType, profileUrl } = body;

    try {

        const { data: userData, error: userError } = await supabase
            .from('users')
            .insert([
                {
                    username,
                    password_,
                    email,
                    phone_number: phoneNumber,
                    profile_picture_url: profileUrl,
                    account_type: employeeType
                }
            ]) .select();
        const userId = userData[0]['user_id'];
        if (userError) {
            throw new Error(userError.message);
        }

        const { data: employeeData, error: employeeError } = await supabase
            .from('employee')
            .insert([
                {
                    employee_id: userId,
                    company_id: null,
                    property_id: propertyId,
                    num_of_assigned_req: 0
                }
            ]);

        if (employeeError) {
            throw new Error(employeeError.message);
        }

        return new Response('Success', {
            status: 200,
        });

    } catch (error) {
        console.error("Error inserting employee:", error);
        return new Response('Internal Server Error', {
            status: 500
        });
    }
}
