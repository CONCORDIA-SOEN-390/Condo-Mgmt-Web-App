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

interface Owner {
  user_id: number;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  profile_picture_url: string;
  account_type: string;
}

export default function UnitsTable({ propertyId }: { propertyId: number }) {
  const [units, setUnits] = useState<Unit[]>([]);
  const [lockers, setLockers] = useState<Record<number, Locker>>({});
  const [parkings, setParkings] = useState<Record<number, Parking>>({});
  const [owners, setOwners] = useState<Record<number, Owner>>({});

  const [unitIdInput, setUnitIdInput] = useState('');
  const [sqftInput, setSqftInput] = useState('');
  const [priceFeeInput, setPriceFeeInput] = useState('');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showRemoveForm, setShowRemoveForm] = useState(false);

  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const [updateFeeSuccessMessage, setUpdateFeeSuccessMessage] = useState("");
  const [updateFeeErrorMessage, setUpdateFeeErrorMessage] = useState("");
  const [removeOwnerSuccessMessage, setRemoveOwnerSuccessMessage] = useState("");
  const [removeOwnerErrorMessage, setRemoveOwnerErrorMessage] = useState("");


  const handleUnitIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUnitIdInput(e.target.value);
  };

  const handleSqftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSqftInput(e.target.value);
  };

  const handlePriceFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFeeInput(e.target.value);
  };

  const handleToggleRegisterForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const handleToggleRemoveForm = () => {
    setShowRemoveForm(!showRemoveForm);
  };

  const handleRowClick = (index: number) => {
    setSelectedRow(selectedRow === index ? null : index);
  };

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




  const handleRegistration = async () => {
    try {

      if (unitIdInput === '' || sqftInput === '' || priceFeeInput === '') {
        console.error('Please fill out all fields');
        return;
      }

      const unitId = parseInt(unitIdInput);
      const sqft = parseFloat(sqftInput);
      const pricePerSqft = parseFloat(priceFeeInput);

      const requestBody = {
        propertyId,
        unitId,
        sqft,
        pricePerSqft
      };


      const response = await fetch('/api/updateSqftPrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setUpdateFeeSuccessMessage("Fee updated successfully");
        setUpdateFeeErrorMessage("");
      } else {
        setUpdateFeeErrorMessage('Failed to update fee');
        setUpdateFeeSuccessMessage("");
      }
    } catch (error) {
      console.error('Error updating fee:', error);
      setUpdateFeeErrorMessage('An error occurred while updating fee');
      setUpdateFeeSuccessMessage("");
    }
  };

  const handleRemoveOwner = async () => {
    try {
      if (unitIdInput === '') {
        console.error('Please enter unit ID');
        return;
      }
      const unitId = parseInt(unitIdInput);

      const requestBody = {
        unitId,
        propertyId
      };
      const response = await fetch('/api/handleRemoveUnitOwner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        setRemoveOwnerSuccessMessage("Owner removed successfully");
        setRemoveOwnerErrorMessage("");
      } else {
        setRemoveOwnerErrorMessage('Failed to remove owner');
        setRemoveOwnerSuccessMessage("");
      }
    } catch (error) {
      console.error('Error removing owner:', error);
      setRemoveOwnerErrorMessage('An error occurred while removing owner');
      setRemoveOwnerSuccessMessage("");
    }
  };

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

          <button
              onClick={handleToggleRegisterForm}
              className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 mb-2"
          >
            Update Fee
          </button>
          <button
              onClick={handleToggleRemoveForm}
              className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Remove Owner
          </button>

          {showRegisterForm && (
              <div className="mt-4">
                <label className="block mb-2">
                  Unit ID:
                  <input
                      type="text"
                      value={unitIdInput}
                      onChange={handleUnitIdChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
                <label className="block mb-2">
                  Enter Square Foot:
                  <input
                      type="text"
                      value={sqftInput}
                      onChange={handleSqftChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
                <label className="block mb-2">
                  Enter Fee by Square Foot:
                  <input
                      type="text"
                      value={priceFeeInput}
                      onChange={handlePriceFeeChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
                <button
                    onClick={handleRegistration}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
                >
                  Update Condo Sqft Fee
                </button>
              </div>
          )}
          {showRemoveForm && (
              <div className="mt-4">
                <label className="block mb-2">
                  Unit ID:
                  <input
                      type="text"
                      value={unitIdInput}
                      onChange={handleUnitIdChange}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>

                <button
                    onClick={handleRemoveOwner}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
                >
                  Remove Owner
                </button>
              </div>
          )}
          {updateFeeSuccessMessage && (
              <div className="text-green-500 py-2">
                <p>{updateFeeSuccessMessage}</p>
              </div>
          )}
          {updateFeeErrorMessage && (
              <div className="text-red-500 py-2">
                <p>{updateFeeErrorMessage}</p>
              </div>
          )}

          {removeOwnerSuccessMessage && (
              <div className="text-green-500 py-2">
                <p>{removeOwnerSuccessMessage}</p>
              </div>
          )}
          {removeOwnerErrorMessage && (
              <div className="text-red-500 py-2">
                <p>{removeOwnerErrorMessage}</p>
              </div>
          )}


          <table className="min-w-full divide-y divide-gray-200">
            <thead className="min-w-full bg-[#DAECFB] text-black">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occupied</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Locker ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Parking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fee Per Sq Ft</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Square Footage</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Condo Fee ($)</th>
            </tr>
            </thead>
            <tbody>
            {units.map((unit, index) => (
                <React.Fragment key={unit.unit_id}>
                  <tr
                      onClick={() => handleRowClick(index)}
                      className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-200 cursor-pointer${
                          selectedRow === index ? 'hover:bg-gray-200' : ''
                      }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.unit_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.occupied ? 'Yes' : 'No'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.owner_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {owners[unit.owner_id] && owners[unit.owner_id].username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {owners[unit.owner_id] && owners[unit.owner_id].email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lockers[unit.owner_id] && lockers[unit.owner_id].locker_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {parkings[unit.owner_id] && parkings[unit.owner_id].parking_id}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.price_per_square_foot}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.square_footage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.condo_fee}</td>
                  </tr>
                  {selectedRow === index && (
                      <tr>
                        <td colSpan={10} className="px-6 bg-blue-100 py-4 pb-6 whitespace-nowrap text-l text-black">
                          Registration Key: {unit.registration_key}
                        </td>
                      </tr>
                  )}
                </React.Fragment>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
