import React from 'react';

const transactions = [
  {
    propertyAddress: "1000 Example Street, Condo #101",
    transactionDate: "2024-03-15",
    transactionType: "Employee Salary",
    description: "Monthly salary for maintenance staff",
    amount: "$2,500.00",
    status: "Paid"
  },
  {
    propertyAddress: "2000 Sample Avenue, Condo #202",
    transactionDate: "2024-03-20",
    transactionType: "Maintenance",
    description: "HVAC system repair",
    amount: "$750.00",
    status: "Paid"
  },
  {
    propertyAddress: "3000 Placeholder Blvd, Condo #303",
    transactionDate: "2024-03-25",
    transactionType: "Utilities",
    description: "Monthly electricity bill",
    amount: "$400.00",
    status: "Pending"
  },
  {
    propertyAddress: "4000 Demo Lane, Condo #404",
    transactionDate: "2024-03-30",
    transactionType: "Special Assessment",
    description: "Pool renovation fund",
    amount: "$1,200.00",
    status: "Pending"
  }
];

export default function FinanceTable() {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-blue-500 text-white">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property Address</th>
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
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionDate}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.transactionType}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.description}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
