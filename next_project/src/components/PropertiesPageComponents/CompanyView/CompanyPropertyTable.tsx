import {useEffect, useState} from 'react';
import React from 'react';
//import UnitsTable from "@/components/UnitsPageComponents/UnitsTable";
import LockerTable from "@/components/PropertiesPageComponents/CompanyView/LockerTable";
import ParkingTable from "@/components/PropertiesPageComponents/CompanyView/ParkingTable";


export default function CompanyPropertyTable({ userId }) {
    const [properties, setProperties] = useState([]);
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('/api/getPropertiesByCompanyId', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });
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

    const handleRowClick = propertyId => {
        setExpandedPropertyId(prevId => (prevId === propertyId ? null : propertyId));
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
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of Units</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Parking Count</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Locker Count</th>
                </tr>
                </thead>
                <tbody>
                {properties.map((property, id) => (
                    <React.Fragment key={id}>
                        <tr onClick={() => handleRowClick(property.property_id)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{/*unit count*/}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{/*parking count*/}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{/*locker count*/}</td>
                        </tr>
                        {/* Render additional details if property's ID matches expandedPropertyId */}
                        {expandedPropertyId === property.property_id && (
                            <tr>
                                <td colSpan="9" className="py-10"> {/* Add padding to create space */}
                                    <div>Additional details here

                                        <LockerTable propertyId={property.property_id} />
                                        <ParkingTable propertyId={property.property_id} />

                                       {/* <UnitsTable />*/}


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