import React from 'react';


// format the database table with these information
// did not filter by month
const transactions = [
  {
    propertyAddress: "1000 Example Street",
    unitNumber: 101,
    type: "Expense",
    transactionDate: "2024-03-15",
    transactionType: "Employee Salary",
    description: "Monthly salary for maintenance staff",
    amount: "$2,500.00",
    status: "Paid"
  },
  {
    propertyAddress: "2000 Sample Avenue",
    unitNumber: 202,
    type: "Expense",
    transactionDate: "2024-03-20",
    transactionType: "Maintenance",
    description: "HVAC system repair",
    amount: "$750.00",
    status: "Paid"
  },
  {
    propertyAddress: "3000 Placeholder Blvd",
    unitNumber: 101,
    type: "Expense",
    transactionDate: "2024-03-25",
    transactionType: "Utilities",
    description: "Monthly electricity bill",
    amount: "$400.00",
    status: "Pending"
  },
  {
    propertyAddress: "4000 Demo Lane",
    unitNumber: 404,
    type: "Expense",
    transactionDate: "2024-03-30",
    transactionType: "Special Assessment",
    description: "Pool renovation fund",
    amount: "$1,200.00",
    status: "Pending"
  },
  {
    propertyAddress: "123 New York",
    unitNumber: 434,
    type: "Income",
    transactionDate: "2024-01-30",
    transactionType: "Rent",
    description: "Property Rent",
    amount: "$2,200.00",
    status: "Paid"
  }
];


//--------- this section is hardcoded. The table information need to be retrieved from the database
const budget = 5000; // retrieve this info from database

// calculates total expenses from the values above
const totalExpenses = transactions.reduce((acc, transaction) => {
  if (transaction.status === 'Paid' && transaction.type === 'Expense') {
    const amount = parseFloat(transaction.amount.replace('$', '').replace(',', ''));
    return acc + amount;
  }
  return acc;
}, 0);

// calculates total income from the values above
const totalIncome = transactions.reduce((acc, transaction) => {
  if (transaction.status === 'Paid' && transaction.type === 'Income') {
    const amount = parseFloat(transaction.amount.replace('$', '').replace(',', ''));
    return acc + amount;
  }
  return acc;
}, 0);

// calculates remaining budget
const remainingBudget = budget - totalExpenses;

//// ---------------- the calculations are put in this file temporarily to give the frontend structure

export default function FinanceTable() {
  return (
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-400 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property Address</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Unit Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Transaction Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Transaction Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
          </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.propertyAddress}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.unitNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">{transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.status}</td>
              </tr>
          ))}
          </tbody>
        </table>
        <table className="min-w-full mt-4 divide-y divide-gray-200">
          <thead className="bg-blue-400 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Budget Information</th>
            <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Amount</th>
          </tr>
          </thead>
          <tbody className="bg-white">
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Total Budget</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${budget}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Total Income</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${totalIncome}</td>
          </tr>
          <tr className="bg-white">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Total Expenses</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${totalExpenses}</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Remaining Budget</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${remainingBudget}</td>
          </tr>
          </tbody>
        </table>
      </div>
  );
}
