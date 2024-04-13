import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import { PiPlusSquareFill } from "react-icons/pi";
import AddFinanceForm from "@/components/FinancePageComponents/CompanyView/AddFinanceForm";
import FinanceTable from "@/components/FinancePageComponents/CompanyView/FinanceTable";

function Request({ userId }) {
    const [showAddEmployee, setShowAddEmployee] = useState({});
    const [properties, setProperties] = useState([]);
    const [showAddRequest, setShowAddRequest] = useState({});

    const toggleAddEmployee = (propertyId) => {
        setShowAddEmployee((prevVisibility) => ({
            ...prevVisibility,
            [propertyId]: !prevVisibility[propertyId],
        }));
    };

    const toggleAddRequest = (propertyId) => {
        setShowAddRequest((prevVisibility) => ({
            ...prevVisibility,
            [propertyId]: !prevVisibility[propertyId],
        }));
    };

    // Getting properties from userId
    useEffect(() => {
        async function fetchProperties(userId) {
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

                const properties = await response.json();
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
                        <button onClick={() => toggleAddEmployee(property.property_id)}><PiPlusSquareFill /></button>
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        {showAddEmployee[property.property_id] && <AddFinanceForm propertyId={property.property_id} />}
                        <FinanceTable propertyId={property.property_id} userId={userId} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Request;
