import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

interface RequestType {
    type_id: number;
    type_name: string;
}

interface AddRequestFormProps {
    userId: number;
    propertyId: number;
}

function AddRequestForm({ userId, propertyId }: AddRequestFormProps) {
    const [requestTypeId, setRequestTypeId] = useState('');
    const [details, setDetails] = useState('');
    const [unitId, setUnitId] = useState('');
    const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function fetchRequestTypes() {
            try {
                const response = await fetch('/api/getRequestTypes');
                if (!response.ok) {
                    throw new Error('Failed to fetch request types');
                }
                const data = await response.json();
                setRequestTypes(data);
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('An error occurred while fetching request types.');
            }
        }
        fetchRequestTypes();
    }, []);

    const handleChangeRequestType = (e: ChangeEvent<HTMLSelectElement>) => {
        setRequestTypeId(e.target.value);
    };

    const handleChangeDetails = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDetails(e.target.value);
    };

    const handleChangeUnitId = (e: ChangeEvent<HTMLInputElement>) => {
        setUnitId(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/handleCreateRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ requestTypeId, details, unitId, userId, propertyId }),
            });

            const data = await response.json();
            if (response.ok) {
                setErrorMessage("Request submitted successfully!");
                setRequestTypeId('');
                setDetails('');
                setUnitId('');
            } else {
                setErrorMessage(data.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('');
        }
    };

    return (
        <div className="bg-sky-100 p-5">
            <h6 className="text-black font-semibold text-lg mb-6">Add Request</h6>
            <form onSubmit={handleSubmit}>
                {/* Request Type */}
                <div className="mb-4">
                    <label htmlFor="requestTypeId" className="block text-sm font-bold text-black mb-2">Request Type</label>
                    <select
                        className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="requestTypeId"
                        value={requestTypeId}
                        onChange={handleChangeRequestType}
                    >
                        <option value="">Select Request Type</option>
                        {requestTypes.map(requestType => (
                            <option key={requestType.type_id} value={requestType.type_id}>{requestType.type_name}</option>
                        ))}
                    </select>
                </div>
                {/* Details */}
                <div className="mb-4">
                    <label htmlFor="details" className="block text-sm font-bold text-black mb-2">Details</label>
                    <textarea
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="details"
                        value={details}
                        onChange={handleChangeDetails}
                        placeholder="Enter Details"
                    />
                </div>
                {/* Unit ID */}
                <div className="mb-4">
                    <label htmlFor="unitId" className="block text-sm font-bold text-black mb-2">Unit ID</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unitId"
                        value={unitId}
                        onChange={handleChangeUnitId}
                        placeholder="Enter Unit ID"
                    />
                </div>
                {/* Error Message */}
                <div className="text-red-500 py-2">
                    {errorMessage && (
                        <p>
                            {errorMessage}
                        </p>
                    )}
                </div>
                {/* Form Actions */}
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Confirm
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => {
                        setRequestTypeId('');
                        setDetails('');
                        setUnitId('');
                    }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddRequestForm;
