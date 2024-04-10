import React, { useState, useEffect } from 'react';
import UnitDetails from './UnitDetails';

interface Unit {
  unit_id: number;
  property_id: number;
  owner_id: number;
  occupied: boolean;
  square_footage: number;
  condo_fee: number;
  ownerName?: string;
  ownerEmail?: string;
}

export default function UnitsTable({ propertyId }: { propertyId: number }) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const response = await fetch('/api/getUnitsFromProperty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ propertyId: propertyId }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch units');
        }
        const data = await response.json();
        setUnits(data);
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    fetchUnits();
  }, [propertyId]);




  const handleRowClick = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const handleCloseDetails = () => {
    setSelectedUnit(null);
  };

  return (
      <div>
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Unit Information</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="min-w-full bg-[#DAECFB] text-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Square Footage</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occupied</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Condo Fee ($)</th>
            </tr>
            </thead>
            <tbody>
            {units.map((unit) => (
                <tr key={unit.unit_id} onClick={() => handleRowClick(unit)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.unit_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.property_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.square_footage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.occupied ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.owner_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.ownerName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.ownerEmail}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{/*owner status rental or owner*/}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.condo_fee}</td>
                </tr>
            ))}
            </tbody>
          </table>
          {selectedUnit && <UnitDetails unit={selectedUnit} onClose={handleCloseDetails} />}
        </div>
      </div>
  );
}
