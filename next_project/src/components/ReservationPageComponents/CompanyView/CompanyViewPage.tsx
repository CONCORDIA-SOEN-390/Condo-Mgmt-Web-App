"use client"
import React, {useContext, useEffect, useState} from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import MyReservationTable from "@/components/ReservationPageComponents/CompanyView/MyReservationTable";
import AvailableFacilityTable from "@/components/ReservationPageComponents/CompanyView/AvailableFacilityTable";
import { PiPlusSquareFill } from "react-icons/pi";
import AddFacilityForm from "@/components/ReservationPageComponents/CompanyView/AddFacilityForm";

interface Property {
    property_id: number;
    property_name: string;
}

interface CompanyViewPageProps {
    userId: number;
}

function CompanyViewPage({ userId }: CompanyViewPageProps) {
    const [openPopupForProperty, setOpenPopupForProperty] = useState<number | null>(null);
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

                const properties = await response.json();
                setProperties(properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        }

        fetchProperties(userId);
    }, [userId]);

    const togglePopup = (propertyId: number) => {
        setOpenPopupForProperty(propertyId === openPopupForProperty ? null : propertyId);
    };

    return (
        <div>
            <h1>Reservations</h1>
            {properties.map((property) => (
                <div key={property.property_id} className="bg-white shadow-lg rounded-xl mb-5">
                    <CardHeader title={`Reservations for Property ${property.property_name}`}>
                        Reservations
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        <MyReservationTable propertyId={property.property_id} />
                    </div>
                    <CardHeader title={`Available Facilities for Property ${property.property_name}`}>
                        <button onClick={() => togglePopup(property.property_id)} className="plus-button">
                            <PiPlusSquareFill size={30} />
                        </button>
                    </CardHeader>
                    {openPopupForProperty === property.property_id && (
                        <div className="p-5">
                            <AddFacilityForm onClose={() => togglePopup(property.property_id)} propertyId={property.property_id} />
                        </div>
                    )}
                    <div className="p-5 text-black text-xl">
                        <AvailableFacilityTable propertyId={property.property_id} userId={userId} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CompanyViewPage;