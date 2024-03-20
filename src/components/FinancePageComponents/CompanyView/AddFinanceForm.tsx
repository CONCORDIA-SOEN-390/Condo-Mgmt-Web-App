import React, { useState } from "react";

function AddFinanceForm() {

    const [address, setAddress] = useState("");
    const [unitNumber, setUnitNumber] = useState("");
    const [type, setType] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    const [transactionType, setTransactionType] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");


/*--------------- set up backend ------------------------- this section is similar to AddPropertyForm
    const handleConfirm = () => {

    };

    const handleCancel = () => {

    };
*/
    return (
        <div className="h-screen">
            <div className="bg-sky-100 min-h-screen p-5">
                <h6 className="text-blue-800 font-semibold text-lg mb-6">Add Finance</h6>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-bold text-blue-700 mb-2">Property Address</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="address"
                        placeholder="Enter Property Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="unitNumber" className="block text-sm font-bold text-blue-700 mb-2">Unit Number</label>
                    <input
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="unitNumber"
                        placeholder="Enter Unit Number"
                        value={unitNumber}
                        onChange={(e) => setUnitNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-bold text-blue-700 mb-2">Income/Expense</label>
                    <select
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value="">Select Income/Expense</option>
                        <option value="Income">Income</option>
                        <option value="Expense">Expense</option>
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
                    <label htmlFor="transactionType" className="block text-sm font-bold text-blue-700 mb-2">Transaction Type</label>
                    <select
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="transactionType"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value)}>
                        <option value="">Select Transaction Type</option>
                        <option value="Employee Salary">Employee Salary</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Special Assessment">Special Assessment</option>
                    </select>
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
                <div className="mb-4">
                    <label htmlFor="status" className="block text-sm font-bold text-blue-700 mb-2">Status</label>
                    <select
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        name="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                </div>
                <div className="flex justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" /*onClick={handleConfirm}*/>
                        Confirm
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" /*onClick={handleCancel}*/>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddFinanceForm;
