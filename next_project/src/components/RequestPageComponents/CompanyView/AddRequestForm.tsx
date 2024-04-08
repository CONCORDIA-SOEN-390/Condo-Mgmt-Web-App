import React, { useState } from "react";

function AddRequestForm({ userId, propertyId }) {
    const [formData, setFormData] = useState({
        requestTypeId: '',
        details: '',
        unitId: '',
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/handleCreateRequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userId, propertyId }),
            });

            const data = await response.json();
            if (response.ok) {
                setErrorMessage("Request submitted successfully!");
                setFormData({
                    requestTypeId: '',
                    details: '',
                    unitId: '',
                });
            } else {
                setErrorMessage(data.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while submitting the request.');
        }
    };

    return (
        <div className="h-screen">
            <div className="bg-sky-100 min-h-screen p-5">
                <h6 className="text-blue-800 font-semibold text-lg mb-6">Add Request</h6>
                <form onSubmit={handleSubmit}>
                    {/* Request Type */}
                    <div className="mb-4">
                        <label htmlFor="requestTypeId" className="block text-sm font-bold text-blue-700 mb-2">Request Type</label>
                        <select
                            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="requestTypeId"
                            value={formData.requestTypeId}
                            onChange={handleChange}
                        >
                            <option value="">Select Request Type</option>
                            <option value="1">Move In</option>
                            <option value="2">Move Out</option>
                            <option value="3">Change Intercom Number</option>
                            <option value="4">Report Violation</option>
                        </select>
                    </div>
                    {/* Details */}
                    <div className="mb-4">
                        <label htmlFor="details" className="block text-sm font-bold text-blue-700 mb-2">Details</label>
                        <textarea
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            placeholder="Enter Details"
                        />
                    </div>
                    {/* Unit ID */}
                    <div className="mb-4">
                        <label htmlFor="unitId" className="block text-sm font-bold text-blue-700 mb-2">Unit ID</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="unitId"
                            value={formData.unitId}
                            onChange={handleChange}
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
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setFormData({
                            requestTypeId: '',
                            details: '',
                            unitId: '',
                        })}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddRequestForm;
