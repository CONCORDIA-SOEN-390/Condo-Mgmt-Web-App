"use client"

import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import RequestTable from "@/components/RequestPageComponents/CompanyView/RequestTable";
import { PiPlusSquareFill } from "react-icons/pi";
import AddEmployee from "@/components/RequestPageComponents/CompanyView/addEmployee";
import AddRequestForm from "@/components/RequestPageComponents/CompanyView/AddRequestForm";
import { useSession } from "next-auth/react";


interface Property {
    property_id: number;
    property_name: string;
    // Add other properties as needed
}


// in progress
function Request() {
    const { data: session } = useSession();
    // @ts-ignore comment
    const { user_id: userId } = session?.user;
    const [showAddEmployee, setShowAddEmployee] = useState<{ [key: number]: boolean }>({});
    const [properties, setProperties] = useState<Property[]>([]);
    const [showAddRequest, setShowAddRequest] = useState<{ [key: number]: boolean }>({});

    const toggleAddEmployee = (propertyId: number) => {
        setShowAddEmployee((prevVisibility) => ({
            ...prevVisibility,
            [propertyId]: !prevVisibility[propertyId],
        }));
    };

    const toggleAddRequest = (propertyId: number) => {
        setShowAddRequest((prevVisibility) => ({
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
                    <div className="p-5 text-black text-xl">{showAddRequest[property.property_id] && <AddRequestForm propertyId={property.property_id} userId={userId} />}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Request;