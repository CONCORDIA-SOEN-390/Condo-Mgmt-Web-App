import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import RequestTable from "@/components/RequestPageComponents/CompanyView/RequestTable";
import { PiPlusSquareFill } from "react-icons/pi";
import AddEmployee from "@/components/RequestPageComponents/CompanyView/addEmployee";
import AddRequestForm from "@/components/RequestPageComponents/CompanyView/AddRequestForm";

// in progress
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
                    <CardHeader title={`Requests for ${property.property_name}`}>
                        <button onClick={() => toggleAddEmployee(property.property_id)}><PiPlusSquareFill/></button>
                        <button onClick={() => toggleAddRequest(property.property_id)}><PiPlusSquareFill/></button>
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        <RequestTable propertyId={property.property_id} userId={userId} />
                        {showAddEmployee[property.property_id] && <AddEmployee propertyId={property.property_id} />}
                    </div>
                    <div className="p-5 text-black text-xl">{showAddRequest[property.property_id] && <AddRequestForm propertyId={property.property_id} />}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Request;