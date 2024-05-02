import React, { useState, useEffect } from 'react';

interface Locker {
    locker_id: number;
    property_id: number;
    owner_id: number;
    condo_fee: number;
    occupied: boolean;
}

interface LockerTableProps {
    propertyId: number;
}

const LockerTable: React.FC<LockerTableProps> = ({ propertyId }) => {
    const [lockers, setLockers] = useState<Locker[]>([]);
    const [lockerOwnerIdInput, setLockerOwnerIdInput] = useState('');
    const [lockerIdInput, setLockerIdInput] = useState('');
    const [lockerFeeInput, setLockerFeeInput] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showUpdateFeeForm, setShowUpdateFeeForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);
    const [registerLockerSuccessMessage, setRegisterLockerSuccessMessage] = useState("");
    const [registerLockerErrorMessage, setRegisterLockerErrorMessage] = useState("");
    const [updateFeeSuccessMessage, setUpdateFeeSuccessMessage] = useState("");
    const [updateFeeErrorMessage, setUpdateFeeErrorMessage] = useState("");
    const [removeLockerOwnerSuccessMessage, setRemoveLockerOwnerSuccessMessage] = useState("");
    const [removeLockerOwnerErrorMessage, setRemoveLockerOwnerErrorMessage] = useState("");


    const handleToggleRemoveForm = () => {
        setShowRemoveForm(!showRemoveForm);
    };

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

    const handleUpdateFee = async () => {
        try {
            const response = await fetch('/api/updateLockerFee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId: propertyId, lockerId: lockerIdInput, fee: lockerFeeInput}),
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

    const handleRemoveLocker = async () => {
        try {
            if (lockerIdInput === '') {
                console.error('Please enter unit ID');
                return;
            }
            const lockerId = parseInt(lockerIdInput);

            const requestBody = {
                lockerId,
                propertyId
            };
            const response = await fetch('/api/handleRemoveLockerOwner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                setRemoveLockerOwnerSuccessMessage("Locker owner removed successfully");
                setRemoveLockerOwnerErrorMessage("");
            } else {
                setRemoveLockerOwnerErrorMessage('Failed to remove locker owner');
                setRemoveLockerOwnerSuccessMessage("");
            }
        } catch (error) {
            console.error('Error removing locker:', error);
            setRemoveLockerOwnerErrorMessage('An error occurred while removing locker owner');
            setRemoveLockerOwnerSuccessMessage("");
        }
    };

    const handleLockerOwnerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLockerOwnerIdInput(e.target.value);
    };

    const handleLockerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLockerIdInput(e.target.value);
    };

    const handleLockerFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLockerFeeInput(e.target.value);
    };

    const handleToggleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm);
        setShowUpdateFeeForm(false);
    };

    const handleToggleUpdateFeeForm = () => {
        setShowUpdateFeeForm(!showUpdateFeeForm);
        setShowRegisterForm(false);
    };

    const handleRegistration = async () => {
        try {
            const response = await fetch('/api/handleLockerRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId: propertyId, lockerOwnerId: lockerOwnerIdInput, lockerId: lockerIdInput  }),
            });

            if (response.ok) {
                const data = await response.json();
                setRegisterLockerSuccessMessage("Locker registered successfully");
                setRegisterLockerErrorMessage("");
                console.log('Registration successful:', data);
            } else {
                console.error('Failed to register owner to locker:', response.statusText);
                setRegisterLockerErrorMessage('An error occurred while registering owner to locker');
                setRegisterLockerSuccessMessage("");
            }

        } catch (error) {
            console.error('Error registering owner to locker:', error);
            setRegisterLockerSuccessMessage("Locker registered successfully");
        }
    };

    return (
        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Locker Information</h2>
            <button
                onClick={handleToggleRegisterForm}
                className="button-spacing bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 mb-2"
            >
                Register Locker
            </button>
            <button
                onClick={handleToggleRemoveForm}
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Remove Locker Owner
            </button>

            <button
                onClick={handleToggleUpdateFeeForm}
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
            >
                Update Fee
            </button>
            {showRegisterForm && (
                <div className="mt-4">
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
                    <button
                        onClick={handleRegistration}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
                    >
                        Register Locker
                    </button>
                </div>
            )}
            {showUpdateFeeForm && (
                <div className="mt-4">
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
                        New Locker Fee:
                        <input
                            type="text"
                            value={lockerFeeInput}
                            onChange={handleLockerFeeChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <button
                        onClick={handleUpdateFee}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
                    >
                        Update Fee
                    </button>
                </div>
            )}
            {showRemoveForm && (
                <div className="mt-4">
                    <label className="block mb-2">
                        Locker ID:
                        <input
                            type="text"
                            value={lockerIdInput}
                            onChange={handleLockerIdChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <button
                        onClick={handleRemoveLocker}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-5"
                    >
                        Remove Locker Owner
                    </button>
                </div>
            )}

            {registerLockerSuccessMessage && (
                <div className="text-green-500 py-2">
                    <p>{registerLockerSuccessMessage}</p>
                </div>
            )}
            {registerLockerErrorMessage && (
                <div className="text-red-500 py-2">
                    <p>{registerLockerErrorMessage}</p>
                </div>
            )}

            {removeLockerOwnerSuccessMessage && (
                <div className="text-green-500 py-2">
                    <p>{removeLockerOwnerSuccessMessage}</p>
                </div>
            )}
            {removeLockerOwnerErrorMessage && (
                <div className="text-red-500 py-2">
                    <p>{removeLockerOwnerErrorMessage}</p>
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
                    {lockers.map((locker, index) => (
                        <tr
                            key={locker.locker_id}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                        >
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
