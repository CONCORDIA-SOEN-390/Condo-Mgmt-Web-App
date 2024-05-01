import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import { PiPlusSquareFill } from "react-icons/pi";
import AddExpenseForm from "@/components/FinancePageComponents/CompanyView/AddExpenseForm";
import ExpenseTable from "@/components/FinancePageComponents/CompanyView/ExpenseTable";
import UnitFee from "@/components/FinancePageComponents/CompanyView/UnitFee";
import IncomeTable from "@/components/FinancePageComponents/CompanyView/IncomeTable";

interface RequestProps {
    userId: number;
}

interface Property {
    property_id: number;
    user_id: number;
    property_name: string;
    property_type: string;
    address: string;
}

function Request({ userId }: RequestProps) {
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);

    // Getting properties from userId
    useEffect(() => {
        async function fetchProperties(userId: number) {
            try {
                const response = await fetch('/api/getPropertiesByCompanyId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const properties: Property[] = await response.json();
                setProperties(properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }

        fetchProperties(userId);
    }, [userId]);

    const handlePropertyClick = (propertyId: number) => {
        setSelectedPropertyId(propertyId === selectedPropertyId ? null : propertyId);
    };

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full bg-[#DAECFB] text-black">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>

                </tr>
                </thead>
                <tbody>
                {properties.map((property, id) => (
                    <React.Fragment key={id}>
                        <tr
                            onClick={() => handlePropertyClick(property.property_id)}
                            className={`${id % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-200 cursor-pointer`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.address}</td>

                        </tr>
                        {selectedPropertyId === property.property_id && (
                            <>
                                <tr>
                                    <td colSpan={7}>
                                        <div className="p-5 text-black text-xl">
                                            <ExpenseTable propertyId={property.property_id} userId={userId} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={7}>
                                        <div className="p-5 text-black text-xl">
                                            <IncomeTable propertyId={property.property_id} userId={userId} />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={7}>
                                        <div className="p-5 text-black text-xl">
                                            <UnitFee propertyId={property.property_id} />
                                        </div>
                                    </td>
                                </tr>
                            </>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>

    );
}

export default Request;
