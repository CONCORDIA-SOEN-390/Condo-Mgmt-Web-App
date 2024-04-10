import React, { useState, useEffect } from 'react';

const ParkingTable = ({ propertyId }) => {
    const [parkings, setParkings] = useState([]);
    const [parkingOwnerIdInput, setParkingOwnerIdInput] = useState('');
    const [parkingIdInput, setParkingIdInput] = useState('');
    const [parkingFeeInput, setParkingFeeInput] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    useEffect(() => {
        const fetchParkings = async () => {
            try {
                const res = await fetch('/api/getParkingForProperty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ propertyId }),
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch lockers');
                }
                const data = await res.json();
                setParkings(data);
            } catch (error) {
                console.error('Error fetching lockers:', error);
            }
        };

        fetchParkings();
    }, [propertyId]);

    const handleParkingOwnerIdChange = (e) => {
        setParkingOwnerIdInput(e.target.value);
    };

    const handleParkingIdChange = (e) => {
        setParkingIdInput(e.target.value);
    };

    const handleParkingFeeChange = (e) => {
        setParkingFeeInput(e.target.value);
    };

    const handleToggleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm);
    };

    const handleRegistration = async () => {
        try {
            const response = await fetch('/api/handleParkingRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ parkingOwnerId: parkingOwnerIdInput, parkingId: parkingIdInput, parkingFee: parkingFeeInput, propertyId: propertyId }),
            });

            if (!response.ok) {
                throw new Error('Failed to register owner to parking');
            }

            const data = await response.json();
            console.log('Registration successful:', data);



        } catch (error) {
            console.error('Error registering owner to parking:', error);

        }
    };


    return (
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Parking Information</h2>
            <button
                onClick={handleToggleRegisterForm}
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Register Parking
            </button>
            {showRegisterForm && (
                <div className="mt-4">
                    <label className="block mb-2">
                        Parking Owner ID:
                        <input
                            type="text"
                            value={parkingOwnerIdInput}
                            onChange={handleParkingOwnerIdChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        Parking ID:
                        <input
                            type="text"
                            value={parkingIdInput}
                            onChange={handleParkingIdChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        Parking Fee:
                        <input
                            type="text"
                            value={parkingFeeInput}
                            onChange={handleParkingFeeChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <button
                        onClick={handleRegistration}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Parking
                    </button>
                </div>
            )}

            <div className="overflow-x-auto mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#DAECFB] text-black">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Parking ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Condo Fee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occupied</th>
                    </tr>
                    </thead>
                    <tbody>
                    {parkings.map(parking => (
                        <tr key={parking.parking_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{parking.parking_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{parking.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{parking.owner_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{parking.condo_fee}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{parking.occupied ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ParkingTable;