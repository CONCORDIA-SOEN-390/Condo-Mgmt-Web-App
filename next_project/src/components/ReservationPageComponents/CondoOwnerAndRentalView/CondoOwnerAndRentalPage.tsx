import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import MyReservationTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/MyReservationTable";
import AvailableFacilityTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/AvailableFacility";

function CondoOwnerAndRentalPage({ userId }) {
    const [openPopupForProperty, setOpenPopupForProperty] = useState(null);
    const [properties, setProperties] = useState([]);

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

    const togglePopup = (propertyId) => {
        setOpenPopupForProperty(propertyId === openPopupForProperty ? null : propertyId);
    };

    return (
        <div>
            {properties.map((property) => (
                <div key={property.property_id} className="bg-white shadow-lg rounded-xl mb-5">
                    <CardHeader title={`Reservations for Property ${property.property.property_name}`}>
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        <MyReservationTable propertyId={property.property_id} userId={userId} />
                    </div>
                    <CardHeader title={`Available Facilities for Property ${property.property.property_name}`}>
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
