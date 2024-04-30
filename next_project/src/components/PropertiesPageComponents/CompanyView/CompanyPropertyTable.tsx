import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import UnitsPage from "@/app/units/page";


interface Property {
  address: string;
  propertyName: string;
  dimension: number;
  numberOfUnits: number;
  numberOfFloors: number;
  parkingCount: number;
  lockerCount: number;
}

export default function CompanyPropertyTable(properties:any) {
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
        {properties.map((property:Property, id: number) => {
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