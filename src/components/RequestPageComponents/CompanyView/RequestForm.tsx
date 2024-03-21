import React, { useState, useContext } from "react";
import { UserContext } from "@/context/userInfoContext";

function RequestForm() {
    const [formData, setFormData] = useState({
        userId: '',
        requestTypeId: '',
        details: '',
        unitId: '',
        propertyId: ''
    });
    const [errorMessage, setErrorMessage] = useState("");
    const { userId } = useContext(UserContext);

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
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setErrorMessage("Request submitted successfully!");
                // Optionally, clear form fields here
                setFormData({
                    userId: '',
                    requestTypeId: '',
                    details: '',
                    unitId: '',
                    propertyId: ''
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
                    <div className="mb-4">
                        <label htmlFor="userId" className="block text-sm font-bold text-blue-700 mb-2">User ID</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="userId"
                            value={formData.userId}
                            onChange={handleChange}
                            placeholder="Enter User ID"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="requestTypeId" className="block text-sm font-bold text-blue-700 mb-2">Request Type ID</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="requestTypeId"
                            value={formData.requestTypeId}
                            onChange={handleChange}
                            placeholder="Enter Request Type ID"
                        />
                    </div>
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
                    <div className="mb-4">
                        <label htmlFor="propertyId" className="block text-sm font-bold text-blue-700 mb-2">Property ID</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="propertyId"
                            value={formData.propertyId}
                            onChange={handleChange}
                            placeholder="Enter Property ID"
                        />
                    </div>
                    <div className="text-red-500 py-2">
                        {errorMessage && (
                            <p>
                                {errorMessage}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Confirm
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={() => setFormData({
                            userId: '',
                            requestTypeId: '',
                            details: '',
                            unitId: '',
                            propertyId: ''
                        })}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RequestForm;
