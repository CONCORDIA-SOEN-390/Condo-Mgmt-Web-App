import React, { useState, useEffect } from 'react';

interface Unit {
  unit_id: number;
  property_id: number;
  owner_id: number;
  occupied: boolean;
  registration_key: string;
  square_footage: number;
  price_per_square_foot: number;
  condo_fee: number;
}

interface Locker {
  locker_id: number;
}

interface Parking {
  parking_id: number;
}

interface Owner{
  user_id: number
  username: string;
  password: string;
  email: string;
  phone_number:string;
  profile_picture_url: string;
  account_type: string;
}

export default function UnitsTable({ propertyId }: { propertyId: number }) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [lockers, setLockers] = useState<Record<number, Locker>>({});
  const [parkings, setParkings] = useState<Record<number, Parking>>({});
  const [owners, setOwners] = useState<Record<number, Owner>>({});


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






  useEffect(() => {
    const fetchLockers = async (ownerId: number) => {
      try {
        const response = await fetch('/api/getLockerByOwnerId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ownerId: ownerId, propertyId: propertyId }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch lockers');
        }
        const data = await response.json();
        if (data.length > 0) {
          setLockers((prevLockers) => ({
            ...prevLockers,
            [ownerId]: data[0],
          }));
        }
      } catch (error) {
        console.error('Error fetching lockers:', error);
      }
    };

    const fetchParkings = async (ownerId: number) => {
      try {
        const response = await fetch('/api/getParkingByOwnerId', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ownerId: ownerId, propertyId: propertyId }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch parkings');
        }
        const data = await response.json();
        if (data.length > 0) {
          setParkings((prevParkings) => ({
            ...prevParkings,
            [ownerId]: data[0],
          }));
        }
      } catch (error) {
        console.error('Error fetching parkings:', error);
      }
    };
    const fetchOwners = async (ownerId: number) => {
      try {
        const response = await fetch('/api/getOwnerInformation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: ownerId }),
        });
        if (!response.ok) {
          throw new Error('Failed to fetch owners');
        }
        const data = await response.json();
        if (data.length > 0) {
          setOwners((prevOwners) => ({
            ...prevOwners,
            [ownerId]: data[0],
          }));
        }
      } catch (error) {
        console.error('Error fetching ownwers:', error);
      }
    };

    units.forEach((unit) => {
      fetchLockers(unit.owner_id);
      fetchParkings(unit.owner_id);
      fetchOwners(unit.owner_id);
    });
  }, [propertyId, units]);

  return (
      <div>
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Unit Information</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="min-w-full bg-[#DAECFB] text-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit ID</th>

              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Square Footage</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occupied</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Locker ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Parking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fee Per Sq Ft</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Registration Key</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Condo Fee ($)</th>
            </tr>
            </thead>
            <tbody>
            {units.map((unit) => (
                <tr key={unit.unit_id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.unit_id}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.square_footage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.occupied ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.owner_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{owners[unit.owner_id] && owners[unit.owner_id].username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{owners[unit.owner_id] && owners[unit.owner_id].email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lockers[unit.owner_id] && lockers[unit.owner_id].locker_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {parkings[unit.owner_id] && parkings[unit.owner_id].parking_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.price_per_square_foot}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.registration_key}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.condo_fee}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
