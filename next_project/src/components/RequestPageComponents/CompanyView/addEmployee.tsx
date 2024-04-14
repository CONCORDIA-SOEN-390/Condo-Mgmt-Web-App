import React, { useState } from "react";

interface AddEmployeeFormProps {
    propertyId: number;
}

function AddEmployeeForm({ propertyId }: AddEmployeeFormProps) {
    const [email, setEmail] = useState('');
    const [password_, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [employeeType, setEmployeeType] = useState('');
    const [profileUrl, setProfileUrl] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleConfirm = async () => {
        if (email.trim() === '' || password_.trim() === '' || username.trim() === '' || phoneNumber.trim() === '' || employeeType.trim() === '' || companyId.trim() === '') {
            setErrorMessage('Please fill in all required fields.');
        } else {
            try {
                const response = await fetch('/api/handleCreateEmployee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        propertyId,
                        email,
                        password_,
                        username,
                        phoneNumber,
                        account_type: employeeType,
                        profileUrl,
                        companyId,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    setErrorMessage('Employee added successfully!');
                    // Clear form fields if submission successful
                    setEmail('');
                    setPassword('');
                    setUsername('');
                    setPhoneNumber('');
                    setEmployeeType('');
                    setProfileUrl('');
                    setCompanyId('');
                } else {
                    setErrorMessage(data.message || 'An error occurred.');
                }
            } catch (error) {
                console.error('Error:', error);
                setErrorMessage('');
            }
        }
    };

    const handleCancel = () => {
        // Clear form fields
        setEmail('');
        setPassword('');
        setUsername('');
        setPhoneNumber('');
        setEmployeeType('');
        setProfileUrl('');
        setCompanyId('');
    };

    return (
        <div className="h-screen">
            <div className="bg-sky-100 min-h-screen p-5">
                <h6 className="text-blue-800 font-semibold text-lg mb-6">Add Employee</h6>
                <div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-bold text-blue-700 mb-2">Email</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-bold text-blue-700 mb-2">Password</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={password_}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-bold text-blue-700 mb-2">Username</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="username"
                            placeholder="Enter Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block text-sm font-bold text-blue-700 mb-2">Phone Number</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="tel"
                            name="phoneNumber"
                            placeholder="Enter Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="employeeType" className="block text-sm font-bold text-blue-700 mb-2">Employee Type</label>
                        <select
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name="employeeType"
                            value={employeeType}
                            onChange={(e) => setEmployeeType(e.target.value)}
                        >
                            <option value="">Select Employee Type</option>
                            <option value="operations">Operations</option>
                            <option value="management">Management</option>
                            <option value="finance">Finance</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="profileUrl" className="block text-sm font-bold text-blue-700 mb-2">Profile URL</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="profileUrl"
                            placeholder="Enter Profile URL"
                            value={profileUrl}
                            onChange={(e) => setProfileUrl(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="companyId" className="block text-sm font-bold text-blue-700 mb-2">Company ID</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            name="companyId"
                            placeholder="Enter Company ID"
                            value={companyId}
                            onChange={(e) => setCompanyId(e.target.value)}
                        />
                    </div>
                </div>
                <div className="text-red-500 py-2">
                    {errorMessage && <p>{errorMessage}</p>}
                </div>
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleConfirm}>
                        Confirm
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddEmployeeForm;
