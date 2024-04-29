import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    try {
        const { propertyId } = await req.json();

        const { data: employees, error: employeeError } = await supabase
            .from('employee')
            .select('*')
            .eq('property_id', propertyId);

        if (employeeError) {
            return new Response(JSON.stringify(employeeError), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const userIds = employees.map(employee => employee.employee_id);

        const { data: usersData, error: usersError } = await supabase
            .from('users')
            .select('user_id, username, phone_number, account_type')
            .in('user_id', userIds);

        if (usersError) {
            return new Response(JSON.stringify(usersError), {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const employeesWithUserInfo = employees.map(employee => {
            const userInfo = usersData.find(user => user.user_id === employee.employee_id);
            return {
                ...employee,
                username: userInfo.username,
                phone_number: userInfo.phone_number,
                account_type: userInfo.account_type
            };
        });

        console.log('Employees with user info:', employeesWithUserInfo);

        return new Response(JSON.stringify(employeesWithUserInfo), {
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
