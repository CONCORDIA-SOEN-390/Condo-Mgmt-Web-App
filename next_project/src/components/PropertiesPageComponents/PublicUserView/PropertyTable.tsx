import { useEffect, useState } from 'react';
import React from "react";
import UnitsTable from "@/components/UnitsPageComponents/CondoOwnerView/UnitsTable";


interface Property {
    property_id: number;
    property: {
        property_id: number;
        property_name: string;
        address: string;
        property_type: string;
    };
}


interface CompanyPropertyTableProps {
    userId: number;
}

export default function CompanyPropertyTable({ userId }: CompanyPropertyTableProps) {
    const [properties, setProperties] = useState<Property[]>([]);
    const [expandedPropertyId, setExpandedPropertyId] = useState<number | null>(null);

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


    const handleRowClick = (propertyId: number) => {
        setExpandedPropertyId((prevId) => (prevId === propertyId ? null : propertyId));
    };

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full bg-[#DAECFB] text-black">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">PropertyName</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property Type</th>
                </tr>
                </thead>
                <tbody>
                {properties.map((property, id) => (
                    <React.Fragment key={id}>
                        <tr onClick={() => handleRowClick(property.property_id)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property.property_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property.property_type}</td>
                        </tr>
                        {expandedPropertyId === property.property_id && (
                            <tr>
                                <td colSpan={9} className="py-10">
                                    <div className="space-y-8">
                                        <UnitsTable propertyId={property.property_id} userId={userId} />
                                    </div>
                                </td>
                            </tr>
                        )}
                    </ React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
}
