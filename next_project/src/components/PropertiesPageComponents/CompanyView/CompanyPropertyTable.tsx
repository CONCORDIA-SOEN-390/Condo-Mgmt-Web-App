import {useEffect, useState} from 'react';
import React from 'react';
import UnitsTable from "@/components/UnitsPageComponents/UnitsTable";
import LockerTable from "@/components/PropertiesPageComponents/CompanyView/LockerTable";


export default function CompanyPropertyTable({ userId }) {
    const [properties, setProperties] = useState([]);

    // Define state to track which property's details are toggled
    const [expandedPropertyId, setExpandedPropertyId] = useState(null);

    useEffect(() => {
        fetch(`/api/getProperties?userId=${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch properties');
                }
                return response.json();
            })
            .then(data => {
                setProperties(data);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
            });
    }, []);

    // Function to toggle the display of property details
    const handleRowClick = propertyId => {
        // If the clicked property is already expanded, collapse it
        // Otherwise, expand it
        setExpandedPropertyId(prevId => (prevId === propertyId ? null : propertyId));
    };

    return (
        <div>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="min-w-full bg-[#DAECFB] text-black">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">PropertyName</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Dimension (sqft)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of Units</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Number of Floors</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Parking Count</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Locker Count</th>
                </tr>
                </thead>
                <tbody>
                {properties.map((property, id) => (
                    <React.Fragment key={id}>
                        <tr onClick={() => handleRowClick(property.property_id)}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.address}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.property_name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.dimension}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.number_units}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.number_floors}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.parking_count}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.locker_count}</td>
                        </tr>
                        {/* Render additional details if property's ID matches expandedPropertyId */}
                        {expandedPropertyId === property.property_id && (
                            <tr>
                                <td colSpan="9" className="py-10"> {/* Add padding to create space */}
                                    <div>Additional details here

                                        <LockerTable propertyId={property.property_id} />

                                        {/*<UnitsTable />*/}


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
