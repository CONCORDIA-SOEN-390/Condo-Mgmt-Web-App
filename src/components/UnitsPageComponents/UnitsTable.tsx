import React, { useState } from 'react';
import UnitDetails from './UnitDetails';

interface Unit {
  unitNumber: number,
  parkingLocker: number,
  size: number;
  occupied: string;
  owner: string;
  email: string;
  fee: number;
}

const UnitsTable: React.FC = () => {
  const units = [
    {
      unitNumber: 101,
      parkingLocker: 1,
      size: 770,
      occupied: "Yes",
      owner: "John Doe",
      email: "john.doe@gmail.com",
      fee: 340.68
    },
    {
      unitNumber: 102,
      parkingLocker: 2,
      size: 780,
      occupied: "Yes",
      owner: "Joe Smith",
      email: "joe.smith@gmail.com",
      fee: 350.09
    },
    {
      unitNumber: 103,
      parkingLocker: 3,
      size: 750,
      occupied: "Yes",
      owner: "Phil Sanders",
      email: "phil.s@hotmail.com",
      fee: 320.34
    },
    {
      unitNumber: 104,
      parkingLocker: 4,
      size: 796,
      occupied: "Yes",
      owner: "Billy Bob",
      email: "bob-b@gmail.com",
      fee: 380.87
    },
    {
      unitNumber: 105,
      parkingLocker: 5,
      size: 773,
      occupied: "Yes",
      owner: "Daisy Jones",
      email: "daisyj@hotmail.com",
      fee: 345.35
    },
    {
      unitNumber: 106,
      parkingLocker: 6,
      size: 733,
      occupied: "No",
      owner: "N/A",
      email: "N/A",
      fee: 305.35
    },
    {
      unitNumber: 107,
      parkingLocker: 7,
      size: 740,
      occupied: "Yes",
      owner: "Karen Kim",
      email: "k.kim@hotmail.com",
      fee: 310.35
    }
  ];

  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const handleRowClick = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleCloseDetails = () => {
    setSelectedUnit(null);
  };

    return (
      <div>
          <table className="min-w-full divide-y divide-gray-200">
        <thead className="min-w-full bg-[#DAECFB] text-black">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Parking Spot</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Locker Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit Size (sqft)</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occupied</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Condo Fee ($)</th>
          </tr>
        </thead>
        <tbody>
          {units.map((unit, id) => {
            return (
              <tr key={id} onClick={() => handleRowClick(unit)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.unitNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.parkingLocker}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.parkingLocker}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.occupied}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.owner}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.fee}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {selectedUnit && (
        <UnitDetails unit={selectedUnit} onClose={handleCloseDetails} />
      )}
      </div>
    );
  }
  export default UnitsTable;