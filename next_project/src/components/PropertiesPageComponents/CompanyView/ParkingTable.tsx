import React, { useState, useEffect } from 'react';

interface Parking {
    parking_id: number;
    property_id: number;
    owner_id: number;
    condo_fee: number;
    occupied: boolean;
}

interface ParkingTableProps {
    propertyId: number;
}

const ParkingTable: React.FC<ParkingTableProps> = ({ propertyId }) => {
    const [parkings, setParkings] = useState<Parking[]>([]);
    const [parkingOwnerIdInput, setParkingOwnerIdInput] = useState('');
    const [parkingIdInput, setParkingIdInput] = useState('');
    const [parkingFeeInput, setParkingFeeInput] = useState('');
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showUpdateFeeForm, setShowUpdateFeeForm] = useState(false);
    const [showRemoveForm, setShowRemoveForm] = useState(false);
    const [registerParkingSuccessMessage, setRegisterParkingSuccessMessage] = useState('');
    const [registerParkingErrorMessage, setRegisterParkingErrorMessage] = useState('');
    const [updateFeeSuccessMessage, setUpdateFeeSuccessMessage] = useState('');
    const [updateFeeErrorMessage, setUpdateFeeErrorMessage] = useState('');
    const [removeParkingSuccessMessage, setRemoveParkingSuccessMessage] = useState('');
    const [removeParkingErrorMessage, setRemoveParkingErrorMessage] = useState('');

    const handleToggleRemoveForm = () => {
        setShowRemoveForm(!showRemoveForm);
    };

    const handleRemoveParking = async () => {
        try {
            if (parkingIdInput === '') {
                console.error('Please enter unit ID');
                return;
            }
            const parkingId = parseInt(parkingIdInput);

            const requestBody = {
                parkingId,
                propertyId
            };
            const response = await fetch('/api/handleRemoveParkingOwner', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                setRemoveParkingSuccessMessage('Parking owner removed successfully');
                setRemoveParkingErrorMessage('');
                console.log('Parking owner removed successfully');
            } else {
                setRemoveParkingErrorMessage('Failed to remove parking owner: ' + response.statusText);
                setRemoveParkingSuccessMessage('');
                console.error('Failed to remove parking:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing parking:', error);
            setRemoveParkingErrorMessage('An error occurred while removing parking owner');
            setRemoveParkingSuccessMessage('');
        }
    };

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
                    throw new Error('Failed to fetch parkings');
                }
                const data = await res.json();
                setParkings(data);
            } catch (error) {
                console.error('Error fetching parkings:', error);
            }
        };

        fetchParkings();
    }, [propertyId]);

    const handleParkingOwnerIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParkingOwnerIdInput(e.target.value);
    };

    const handleParkingIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParkingIdInput(e.target.value);
    };

    const handleParkingFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParkingFeeInput(e.target.value);
    };

    const handleToggleUpdateFeeForm = () => {
        setShowUpdateFeeForm(!showUpdateFeeForm);
        setShowRegisterForm(false);
    };

    const handleUpdateFee = async () => {
        try {
            const response = await fetch('/api/updateParkingFee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId: propertyId, parkingId: parkingIdInput, fee: parkingFeeInput }),
            });

            if (response.ok) {
                setUpdateFeeSuccessMessage('Parking fee updated successfully');
                setUpdateFeeErrorMessage('');
                console.log('Parking fee updated successfully');
            } else {
                setUpdateFeeErrorMessage('Failed to update parking fee: ' + response.statusText);
                setUpdateFeeSuccessMessage('');
                console.error('Failed to update parking fee:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating parking fee:', error);
            setUpdateFeeErrorMessage('An error occurred while updating parking fee');
            setUpdateFeeSuccessMessage('');
        }
    };

    const handleRegistration = async () => {
        try {
            const response = await fetch('/api/handleParkingRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ propertyId: propertyId, parkingOwnerId: parkingOwnerIdInput, parkingId: parkingIdInput }),
            });

            if (response.ok) {
                setRegisterParkingSuccessMessage('Parking registered successfully');
                setRegisterParkingErrorMessage('');
                console.log('Registration successful');
            } else {
                setRegisterParkingErrorMessage('Failed to register parking: ' + response.statusText);
                setRegisterParkingSuccessMessage('');
                console.error('Failed to register parking:', response.statusText);
            }
        } catch (error) {
            console.error('Error registering parking:', error);
            setRegisterParkingErrorMessage('An error occurred while registering parking');
            setRegisterParkingSuccessMessage('');
        }
    };

    const handleToggleRegisterForm = () => {
        setShowRegisterForm(!showRegisterForm);
        setShowUpdateFeeForm(false);
    };

    return (
        <div className="overflow-x-auto bg-gray-50 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Parking Information</h2>
            <button
                onClick={handleToggleRegisterForm}
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
                Register Parking
            </button>
            <button
                onClick={handleToggleRemoveForm}
                className="bg-blue-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Remove Parking Owner
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
                    <button
                        onClick={handleRegistration}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register Parking
                    </button>
                </div>
            )}
            {showUpdateFeeForm && (
                <div className="mt-4">
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
                        New Parking Fee:
                        <input
                            type="text"
                            value={parkingFeeInput}
                            onChange={handleParkingFeeChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <button
                        onClick={handleUpdateFee}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Update Fee
                    </button>
                </div>
            )}
            {showRemoveForm && (
                <div className="mt-4">
                    <label className="block mb-2">
                        Parking ID:
                        <input
                            type="text"
                            value={parkingIdInput}
                            onChange={handleParkingIdChange}
                            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </label>
                    <button
                        onClick={handleRemoveParking}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Remove Parking Owner
                    </button>
                </div>
            )}

            {registerParkingSuccessMessage && (
                <div className="text-green-600 mt-2">{registerParkingSuccessMessage}</div>
            )}
            {registerParkingErrorMessage && (
                <div className="text-red-600 mt-2">{registerParkingErrorMessage}</div>
            )}
            {updateFeeSuccessMessage && (
                <div className="text-green-600 mt-2">{updateFeeSuccessMessage}</div>
            )}
            {updateFeeErrorMessage && (
                <div className="text-red-600 mt-2">{updateFeeErrorMessage}</div>
            )}
            {removeParkingSuccessMessage && (
                <div className="text-green-600 mt-2">{removeParkingSuccessMessage}</div>
            )}
            {removeParkingErrorMessage && (
                <div className="text-red-600 mt-2">{removeParkingErrorMessage}</div>
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
                    {parkings.map((parking, index) => (
                        <tr
                            key={parking.parking_id}
                            className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                        >
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
