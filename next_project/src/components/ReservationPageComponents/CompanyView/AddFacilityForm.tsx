import React, { useState } from "react";

interface AddFacilityFormProps {
    propertyId: number;
}

function AddFacilityForm({ propertyId }: AddFacilityFormProps) {
    const [formData, setFormData] = useState({
        facilityName: "",
        facilityDescription: ""
    });

    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        try {
            const response = await fetch("/api/addFacility", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    propertyId: propertyId,
                    name: formData.facilityName,
                    description: formData.facilityDescription,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to add facility");
            }


            setFormData({
                facilityName: "",
                facilityDescription: ""
            });

        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while submitting the request.');
        }
    };

    return (
        <div className="h-auto">
            <div className="bg-sky-100 p-5">
                <h6 className="text-blue-800 font-semibold text-lg mb-6">Add Facility</h6>
                <form onSubmit={handleSubmit}>
                    {/* Facility Name */}
                    <div className="mb-4">
                        <label htmlFor="facilityName" className="block text-sm font-bold text-blue-700 mb-2">Facility Name</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="facilityName"
                            value={formData.facilityName}
                            onChange={handleChange}
                            placeholder="Enter Facility Name"
                        />
                    </div>
                    {/* Facility Description */}
                    <div className="mb-4">
                        <label htmlFor="facilityDescription" className="block text-sm font-bold text-blue-700 mb-2">Facility Description</label>
                        <textarea
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="facilityDescription"
                            value={formData.facilityDescription}
                            onChange={handleChange}
                            placeholder="Enter Facility Description"
                        />
                    </div>
                    {/* Error Message */}
                    <div className="text-red-500 py-2">
                        {errorMessage && (
                            <p>{errorMessage}</p>
                        )}
                    </div>
                    {/* Form Actions */}
                    <div className="flex justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Confirm
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddFacilityForm;