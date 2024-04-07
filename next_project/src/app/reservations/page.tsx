"use client"
import React, { useEffect, useState } from "react";
import SideBar from "@/components/GeneralComponents/PublicUserView/SideBar";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import MyReservationTable from "@/components/ReservationPageComponents/MyReservationTable";
import AvailableFacilityTable from "@/components/ReservationPageComponents/AvailableFacilityTable";
import { MdEditSquare } from "react-icons/md";

function ReservationsPage() {
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

    return (
        <div className="flex min-h-screen bg-gray-100">
            <SideBar page="reservations" />
            <div className="flex flex-col flex-grow w-full">
                <div className="w-full md:w-3/4 ml-auto mr-5">
                    <div className="bg-white shadow-lg rounded-xl mb-5">
                        <CardHeader title="My Reservations">
                            <MdEditSquare className="text-white text-3xl" />
                        </CardHeader>
                        <div className="p-5 text-black text-xl">
                            <MyReservationTable />
                        </div>
                    </div>
                    {properties.map((property) => (
                        <div key={property.property_id} className="bg-white shadow-lg rounded-xl mb-5">
                            <CardHeader title={`Available Facilities for Property ${property.property_name}`}>
                                {/* You can place any content here */}
                            </CardHeader>
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
