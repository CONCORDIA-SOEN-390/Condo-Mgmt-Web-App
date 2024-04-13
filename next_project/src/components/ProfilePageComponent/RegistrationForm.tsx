import React, { useState } from 'react';

function RegisterForm({userId}) {
    const [regKey, setRegKey] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/handleRegisterUnit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, regKey }),
            });

            const data = await response.json();
            if (response.ok) {
                setErrorMessage('Unit registered successfully!');
                setRegKey('');
            } else {
                setErrorMessage(data.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-blue-50 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div className="md:flex">
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-2">Register Unit</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Registration Key:</label>
                            <input
                                type="text"
                                value={regKey}
                                onChange={(e) => setRegKey(e.target.value)}
                                className="w-full md:w-96 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            />

                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Register
                        </button>
                    </form>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
