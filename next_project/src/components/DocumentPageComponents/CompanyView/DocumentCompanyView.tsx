import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import { PiPlusSquareFill } from "react-icons/pi";
import DocumentTable from "@/components/DocumentPageComponents/CompanyView/DocumentTable";
import DocumentUploadForm from "@/components/DocumentPageComponents/CompanyView/DocumentUploadForm";

interface Property {
    property_id: number;
    property_name: string;
}

interface RequestProps {
    userId: number;
}

function Request({ userId }: RequestProps) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [showAddRequest, setShowAddRequest] = useState<{ [key: number]: boolean }>({});


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
                    <CardHeader title={`Documents for ${property.property_name}`}>
                        <button onClick={() => toggleAddRequest(property.property_id)}><PiPlusSquareFill/></button>
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        <DocumentTable propertyId={property.property_id} userId={userId} />
                    </div>
                    <div className="p-5 text-black text-xl">{showAddRequest[property.property_id] && <DocumentUploadForm propertyId={property.property_id} userId={userId} />}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Request;