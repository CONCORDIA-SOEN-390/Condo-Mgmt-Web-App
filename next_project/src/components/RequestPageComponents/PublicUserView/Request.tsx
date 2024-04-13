import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import AddRequestForm from "@/components/RequestPageComponents/CompanyView/AddRequestForm";
import RequestTable from "@/components/RequestPageComponents/PublicUserView/RequestTable";
import { PiPlusSquareFill } from "react-icons/pi";

function Request({ userId }) {
    const [properties, setProperties] = useState([]);
    const [showAddRequestForms, setShowAddRequestForms] = useState({});

    const toggleFormAdd = (propertyId) => {
        setShowAddRequestForms((prevForms) => ({
            ...prevForms,
            [propertyId]: !prevForms[propertyId],
        }));
    };


    // Getting properties from userId -> owner
    useEffect(() => {
        async function fetchProperties(userId) {
            try {
                const response = await fetch('/api/getPropertyFromOwnerId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const fetchedProperties = await response.json();

                // Filter out duplicate property IDs
                const uniquePropertyIds = [];
                const uniqueProperties = [];
                fetchedProperties.forEach(property => {
                    if (!uniquePropertyIds.includes(property.property_id)) {
                        uniquePropertyIds.push(property.property_id);
                        uniqueProperties.push(property);
                    }
                });

                setProperties(uniqueProperties);
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
                    <CardHeader title={`Requests for ${property.property.property_name}`}>
                        <button onClick={() => toggleFormAdd(property.property_id)}><PiPlusSquareFill/></button>
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        {showAddRequestForms[property.property_id] && <AddRequestForm propertyId={property.property_id} userId={userId} />}
                        <RequestTable propertyId={property.property_id} userId={userId} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Request;