import React, { useState, useEffect } from 'react';

const LockerTable = ({ propertyId }) => {
    const [lockers, setLockers] = useState([]);
    const [propertyIdInput, setPropertyIdInput] = useState('');
    const [lockerOwnerIdInput, setLockerOwnerIdInput] = useState('');
    const [lockerIdInput, setLockerIdInput] = useState('');
    const [lockerFeeInput, setLockerFeeInput] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    useEffect(() => {
        const fetchLockers = async () => {
            try {
                const res = await fetch('/api/getLockerForProperty', {
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
                setLockers(data);
            } catch (error) {
                console.error('Error fetching lockers:', error);
            }
        };

        fetchLockers();
    }, [propertyId]);

    const handlePropertyIdChange = (e) => {
        setPropertyIdInput(e.target.value);
    };

    const handleLockerOwnerIdChange = (e) => {
        setLockerOwnerIdInput(e.target.value);
    };

    const handleLockerIdChange = (e) => {
        setLockerIdInput(e.target.value);
    };

    const handleLockerFeeChange = (e) => {
        setLockerFeeInput(e.target.value);
    };

    const handleToggleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm);
    };

    const handleRegistration = async () => {
        try {
            const response = await fetch('/api/handleLockerRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId: propertyIdInput, lockerOwnerId: lockerOwnerIdInput, lockerId: lockerIdInput, lockerFee: lockerFeeInput }),
            });

            if (!response.ok) {
                throw new Error('Failed to register owner to locker');
            }

            const data = await response.json();
            console.log('Registration successful:', data);

            // Add any further logic after successful registration

        } catch (error) {
            console.error('Error registering owner to locker:', error);
            // Handle error
        }
    };


    return (
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Locker Information</h2>
            <button
                onClick={handleToggleRegisterForm}
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Register Locker
            </button>
            {showRegisterForm && (
                <div className="mt-4">
                    <label className="block mb-2">
                        Property ID:
                        <input
                            type="text"
                            value={propertyIdInput}
                            onChange={handlePropertyIdChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        Locker Owner ID:
                        <input
                            type="text"
                            value={lockerOwnerIdInput}
                            onChange={handleLockerOwnerIdChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        Locker ID:
                        <input
                            type="text"
                            value={lockerIdInput}
                            onChange={handleLockerIdChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <label className="block mb-2">
                        Locker Fee:
                        <input
                            type="text"
                            value={lockerFeeInput}
                            onChange={handleLockerFeeChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <button
                        onClick={handleRegistration}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register Owner to Locker
                    </button>
                </div>
            )}


            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-[#DAECFB] text-black">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Locker ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Owner ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Condo Fee</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occupied</th>
                    </tr>
                    </thead>
                    <tbody>
                    {lockers.map(locker => (
                        <tr key={locker.locker_id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{locker.locker_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{locker.property_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{locker.owner_id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{locker.condo_fee}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">{locker.occupied ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LockerTable;
