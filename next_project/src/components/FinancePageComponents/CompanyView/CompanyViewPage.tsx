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
    const [showAddEmployee, setShowAddEmployee] = useState<Record<number, boolean>>({});
    const [properties, setProperties] = useState<Property[]>([]);
    const [showAddRequest, setShowAddRequest] = useState({});

    const toggleAddEmployee = (propertyId: number) => {
        setShowAddEmployee((prevVisibility) => ({
            ...prevVisibility,
            [propertyId]: !prevVisibility[propertyId],
        }));
    };

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

    return (
        <div>
            {properties.map((property) => (
                <div key={property.property_id} className="bg-white shadow-lg rounded-xl mb-5">
                    <CardHeader title={`Finances for ${property.property_name}`}>
                        .
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        <ExpenseTable propertyId={property.property_id} userId={userId} />
                    </div>
                    <div className="p-5 text-black text-xl">
                        <IncomeTable propertyId={property.property_id} userId={userId} />
                    </div>
                    <div className="p-5 text-black text-xl">
                        <UnitFee propertyId={property.property_id} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Request;
