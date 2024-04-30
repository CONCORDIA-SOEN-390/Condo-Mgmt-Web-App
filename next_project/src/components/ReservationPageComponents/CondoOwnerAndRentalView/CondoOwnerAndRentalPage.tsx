import React, { useEffect, useState } from "react";
import CardHeader from "@/components/GeneralComponents/CardHeader";
import MyReservationTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/MyReservationTable";
import AvailableFacilityTable from "@/components/ReservationPageComponents/CondoOwnerAndRentalView/AvailableFacility";

interface Property {
    property_id: number;
    property: {
        address: string;
        property_name: string;
    };
}

function CondoOwnerAndRentalPage({ userId }: { userId: number }) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

    const handlePropertyClick = (propertyId: number) => {
        setSelectedPropertyId(propertyId === selectedPropertyId ? null : propertyId);
    };


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
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full bg-[#DAECFB] text-black">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                </tr>
                </thead>
                <tbody>
                {properties.map((property, id) => (
                    <React.Fragment key={id}>
                        <tr
                            onClick={() => handlePropertyClick(property.property_id)}
                            className={`${
                                id % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                            } hover:bg-gray-200 cursor-pointer`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property.property_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property.address}</td>
                        </tr>
                        {selectedPropertyId === property.property_id && (
                            <tr>
                                <td colSpan={3}>
                                    <div className="p-5 text-black text-xl">
                                        <AvailableFacilityTable propertyId={property.property_id} userId={userId} />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default CondoOwnerAndRentalPage;
