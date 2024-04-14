import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import MyReservationTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/MyReservationTable";
import AvailableFacilityTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/AvailableFacility";

interface Property {
    property_id: number;
    property: {
        property_id: number;
        property_name: string;
    };
}

function CondoOwnerAndRentalPage({ userId }: { userId: number }) {
    const [properties, setProperties] = useState<Property[]>([]);

    // Getting properties from userId -> owner
    useEffect(() => {
        async function fetchProperties(userId: number) {
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

                const fetchedProperties: Property[] = await response.json();

                // Filter out duplicate property IDs
                const uniqueProperties: Property[] = [];
                const uniquePropertyIds: Set<number> = new Set();
                fetchedProperties.forEach((property) => {
                    if (!uniquePropertyIds.has(property.property_id)) {
                        uniquePropertyIds.add(property.property_id);
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
                    <CardHeader title={`Reservations for Property ${property.property.property_name}`}>
                        .
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        <MyReservationTable propertyId={property.property_id} userId={userId} />
                    </div>
                    <CardHeader title={`Available Facilities for Property ${property.property.property_name}`}>
                        .
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        <AvailableFacilityTable propertyId={property.property_id} userId={userId} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CondoOwnerAndRentalPage;
