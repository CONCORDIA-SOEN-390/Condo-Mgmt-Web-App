"use client"
import React, {useContext, useEffect, useState} from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import MyReservationTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/MyReservationTable";
import AvailableFacilityTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/AvailableFacilityTable";


function CondoOwnerAndRentalPage({ userId }) {
    const [openPopupForProperty, setOpenPopupForProperty] = useState(null);
    const [properties, setProperties] = useState([]);

    // Getting properties from userId
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // this api call reads the unit table, finds the owner id, then finds the property id
                const response = await fetch(`/api/getPropertyFromOwnerId?ownerId=${userId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch properties');
                }
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();
    }, [userId]);

    const togglePopup = (propertyId) => {
        setOpenPopupForProperty(propertyId === openPopupForProperty ? null : propertyId);
    };

    return (
        <div>
            {properties.map((property) => (
                <div key={property.property_id} className="bg-white shadow-lg rounded-xl mb-5">
                    <CardHeader title={`Reservations for Property ${property.property_name}`}>
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        <MyReservationTable propertyId={property.property_id} userId={userId} />
                    </div>
                    <CardHeader title={`Available Facilities for Property ${property.property_name}`}>

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