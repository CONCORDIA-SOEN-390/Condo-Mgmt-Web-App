import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import UnitsPage from "@/app/units/page";

const properties = [
  {
    address: "1000 Example Street",
    propertyName: "The Grand Residences",
    dimension: 200000, // Total square footage of the building
    numberOfUnits: 50,
    numberOfFloors: 5,
    parkingCount: 60, // Total number of parking spaces available
    lockerCount: 50, // Total number of lockers available
  },
  {
    address: "2000 Sample Avenue",
    propertyName: "Lakeside Condos",
    dimension: 300000,
    numberOfUnits: 75,
    numberOfFloors: 10,
    parkingCount: 80,
    lockerCount: 70,
  },
  {
    address: "3000 Placeholder Blvd",
    propertyName: "Metro Living Towers",
    dimension: 250000,
    numberOfUnits: 60,
    numberOfFloors: 8,
    parkingCount: 70,
    lockerCount: 60,
  },
  {
    address: "4000 Demo Lane",
    propertyName: "Urban Heights",
    dimension: 150000,
    numberOfUnits: 40,
    numberOfFloors: 4,
    parkingCount: 45,
    lockerCount: 40,
  },
  {
    address: "5000 Mockup Road",
    propertyName: "Skyline Estates",
    dimension: 350000,
    numberOfUnits: 100,
    numberOfFloors: 15,
    parkingCount: 110,
    lockerCount: 100,
  }
];

export default function PropertyTable() {
  const router = useRouter()
  const handleRowClick = (propertyName: string) => {
    <UnitsPage propertyName={propertyName}/>
    router.push('/units')
  };
  
  return (
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
        {properties.map((property, id) => {
          return (
            <tr key={id} onClick={() => handleRowClick(property.propertyName)}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{id + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.address}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.propertyName}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.dimension}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.numberOfUnits}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.numberOfFloors}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.parkingCount}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{property.lockerCount}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}