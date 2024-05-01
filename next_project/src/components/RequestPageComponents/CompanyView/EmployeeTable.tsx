import React, { useState, useEffect } from 'react';
import AddRequestForm from "@/components/RequestPageComponents/CompanyView/AddRequestForm";
import AddEmployee from "@/components/RequestPageComponents/CompanyView/addEmployee";

interface Employee {
    employee_id: number;
    property_id: number;
    username: string;
    phone_number: string;
    account_type: string;
    email: string;
}

interface RequestTableProps {
    userId: number;
    propertyId: number;
}

const RequestTable: React.FC<RequestTableProps> = ({ propertyId }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddEmployee, setShowAddEmployee] = useState<boolean>(false);


    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/getEmployeeByProperty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ propertyId })
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                // @ts-ignore
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployees();
    }, [propertyId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const toggleAddEmployee = () => {
        setShowAddEmployee(!showAddEmployee);
    };




    return (
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Employee Information</h2>

            <button
                onClick={toggleAddEmployee}
                className="button-spacing bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
            >
                Add Employee
            </button>

            {showAddEmployee && <AddEmployee propertyId={propertyId}  />}

            <div className="overflow-x-auto">
                {employees.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="min-w-full bg-[#DAECFB] text-black">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Employee ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Phone Number</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {employees.map(employee => (
                            <tr key={employee.employee_id} className="bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.employee_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.property_id}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.phone_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.account_type}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No employees found</div>
                )}
            </div>
        </div>
    );
};

export default RequestTable;
