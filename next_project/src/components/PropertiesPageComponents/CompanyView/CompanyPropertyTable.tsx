import { useEffect, useState } from 'react';
import React from "react";
import LockerTable from "@/components/PropertiesPageComponents/CompanyView/LockerTable";
import ParkingTable from "@/components/PropertiesPageComponents/CompanyView/ParkingTable";

export default function CompanyPropertyTable({ userId }) {
    const [properties, setProperties] = useState([]);
    const [lockerCounts, setLockerCounts] = useState({});
    const [parkingCounts, setParkingCounts] = useState({});
    const [unitCounts, setUnitCounts] = useState({});
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

    useEffect(() => {
        const fetchLockerCount = async (propertyId) => {
            try {
                const response = await fetch('/api/getLockerCount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ propertyId }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch locker count');
                }
                const count = await response.json();
                setLockerCounts((prevCounts) => ({
                    ...prevCounts,
                    [propertyId]: count,
                }));
            } catch (error) {
                console.error('Error fetching locker count:', error);
            }
        };

        properties.forEach((property) => {
            fetchLockerCount(property.property_id);
        });
    }, [properties]);

    useEffect(() => {
        const fetchParkingCount = async (propertyId) => {
            try {
                const response = await fetch('/api/getParkingCount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ propertyId }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch parking count');
                }
                const count = await response.json();
                setParkingCounts((prevCounts) => ({
                    ...prevCounts,
                    [propertyId]: count,
                }));
            } catch (error) {
                console.error('Error fetching parking count:', error);
            }
        };

        properties.forEach((property) => {
            fetchParkingCount(property.property_id);
        });
    }, [properties]);


    useEffect(() => {
        const fetchUnitCount = async (propertyId) => {
            try {
                const response = await fetch('/api/getUnitCount', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ propertyId }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch parking count');
                }
                const count = await response.json();
                setUnitCounts((prevCounts) => ({
                    ...prevCounts,
                    [propertyId]: count,
                }));
            } catch (error) {
                console.error('Error fetching parking count:', error);
            }
        };

        properties.forEach((property) => {
            fetchUnitCount(property.property_id);
        });
    }, [properties]);

    const handleRowClick = (propertyId) => {
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
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unitCounts[property.property_id]}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parkingCounts[property.property_id]}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lockerCounts[property.property_id]}</td>
                        </tr>
                        {expandedPropertyId === property.property_id && (
                            <tr>
                                <td colSpan="9" className="py-10">
                                    <div>Additional details here

                                    <LockerTable propertyId={property.property_id} />
                                    <ParkingTable propertyId={property.property_id} />

                                    {/*<UnitsTable />*/}

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
