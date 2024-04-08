import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import MyReservationTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/MyReservationTable";
import AvailableFacilityTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/AvailableFacilityTable";
import { MdEditSquare } from "react-icons/md";
import AddRequestForm from "@/components/RequestPageComponents/CompanyView/AddRequestForm";
import RequestTable from "@/components/RequestPageComponents/CompanyView/RequestTable";
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

    // Getting properties from userId
    useEffect(() => {
        const fetchProperties = async () => {
            try {
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
    }, [userId]);

    return (
        <div>
            {properties.map((property) => (
                <div key={property.property_id} className="bg-white shadow-lg rounded-xl mb-5">
                    <CardHeader title={`Requests for ${property.property_name}`}>
                        <button onClick={() => toggleFormAdd(property.property_id)}><PiPlusSquareFill/></button>
                    </CardHeader>
                    <div className="p-5 text-black text-xl">
                        <RequestTable propertyId={property.property_id} userId={userId} />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Request;
