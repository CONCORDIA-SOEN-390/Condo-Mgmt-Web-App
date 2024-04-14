import React, { useState } from "react";

interface AddFinanceFormProps {
    propertyId: number;
}

function AddIncomeForm({ propertyId }: AddFinanceFormProps) {
    const [occurrence, setOccurrence] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [companyId, setCompanyId] = useState("");

    const handleConfirm = async () => {
        try {
            const response = await fetch('/api/addIncome', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    companyId: companyId,
                    value: amount,
                    description: description,
                    occurence: occurrence,
                    date: transactionDate,
                    propertyId: propertyId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to add finance data');
            }
            console.log('Finance data added successfully');

        } catch (error) {
            console.error('Error adding finance data:', error);
        }
    };

    return (
        <div className="h-screen">
            <div className="bg-sky-100 min-h-screen p-5">
                <h6 className="text-blue-800 font-semibold text-lg mb-6">Add Finance</h6>
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
                <div className="mb-4">
                    <label htmlFor="occurrence" className="block text-sm font-bold text-blue-700 mb-2">Occurrence</label>
                    <select
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="occurrence"
                        value={occurrence}
                        onChange={(e) => setOccurrence(e.target.value)}
                    >
                        <option value="">Select Occurrence</option>
                        <option value="one-time">One-Time</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="transactionDate" className="block text-sm font-bold text-blue-700 mb-2">Transaction Date</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        name="transactionDate"
                        value={transactionDate}
                        onChange={(e) => setTransactionDate(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-bold text-blue-700 mb-2">Description</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="description"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-bold text-blue-700 mb-2">Amount</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        name="amount"
                        placeholder="Enter Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddIncomeForm;
