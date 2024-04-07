"use client"
import React, { useEffect, useState } from "react";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import MyReservationTable from "@/components/ReservationPageComponents/MyReservationTable";
import AvailableFacilityTable from "@/components/ReservationPageComponents/AvailableFacilityTable";
import { MdEditSquare } from "react-icons/md";
import { PiPlusSquareFill } from "react-icons/pi";
import AddFacilityForm from "@/components/ReservationPageComponents/AddFacilityForm";

function ReservationsPage() {
    const [openPopupForProperty, setOpenPopupForProperty] = useState(null);
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const userId = 1; // Hardcoded user ID for now

                const response = await fetch(`/api/getProperties?userId=${userId}`);
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
    }, []);

    const togglePopup = (propertyId) => {
        setOpenPopupForProperty(propertyId === openPopupForProperty ? null : propertyId);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideBar page="reservations" />
            <div className="flex flex-col flex-grow w-full">
                <div className="w-full md:w-3/4 ml-auto mr-5">
                    {properties.map((property) => (
                        <div key={property.property_id} className="bg-white shadow-lg rounded-xl mb-5">
                            <CardHeader title={`Reservations for Property ${property.property_name}`}>
                                <MdEditSquare className="text-white text-3xl" />
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
                                <AvailableFacilityTable propertyId={property.property_id} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReservationsPage;
