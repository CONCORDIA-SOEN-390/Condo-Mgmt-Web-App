import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
    const body = await req.json();
    const { userId, requestTypeId, details, unitId, propertyId } = body;
    let employeesWithAccountTypes;

    const defaultStatusId = 1;

    try {

        // Fetch Employees
        const { data: employees, error: employeeError } = await supabase
            .from('employee')
            .select('*')
            .eq('property_id', propertyId);

        if (employeeError) {
            // Handle error
        } else {
            // Extract employee IDs
            const employeeIds = employees.map(employee => employee.employee_id);

            // Fetch Users
            const { data: users, error: userError } = await supabase
                .from('users')
                .select('user_id, account_type')
                .in('user_id', employeeIds);

            if (userError) {
                // Handle error
            } else {
                // Combine employee data with account types
                employeesWithAccountTypes = employees.map(employee => {
                    const user = users.find(user => user.user_id === employee.employee_id);
                    const account_type = user ? user.account_type : null;

                    return { ...employee, account_type };


                });

                // Handle successful response
                // Handle successful response
                let specificFields;
                if (requestTypeId === 1 || requestTypeId === 2 || requestTypeId === 3) {
                    // Fetch operations employees
                    specificFields = employeesWithAccountTypes
                        .filter(employee => employee.account_type === 'operations')
                        .map(employee => ({
                            employee_id: employee.employee_id,
                            account_type: employee.account_type,
                            // Add more fields as needed
                        }));
                } else {
                    // Fetch management employees
                    specificFields = employeesWithAccountTypes
                        .filter(employee => employee.account_type === 'management')
                        .map(employee => ({
                            employee_id: employee.employee_id,
                            account_type: employee.account_type,
                            // Add more fields as needed
                        }));
                }


                // Find the employee with the lowest num_of_assigned_req using reduce
                const selectedEmployee = employeesWithAccountTypes.reduce((prev, current) => {
                    return (prev.num_of_assigned_req < current.num_of_assigned_req) ? prev : current;
                });

                //console.log('Selected Employee---------------:', selectedEmployee);




                await supabase
                    .from('employee')
                    .update({ num_of_assigned_req: selectedEmployee.num_of_assigned_req + 1 })
                    .eq('employee_id', selectedEmployee.employee_id);

                console.log('Updated num_of_assigned_req for selectedEmployee');


                console.log("here-------end-------------");



            }
        }


        return new Response('Success', {
            status: 200,
        });
    } catch (error) {
        console.error("Error inserting data into tables:", error);
        return new Response('Internal Server Error', {
            status: 500,
        });
    }
}