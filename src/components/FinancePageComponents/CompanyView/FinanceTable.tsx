import React from 'react';

/* put database operations, i put the data inside the function to test the frontend
const transactions = [
  {
    propertyAddress: "1000 Example",
    unitNumber: 101,
    type: "Expense",
    transactionDate: "2024-03-15",
    transactionType: "Employee Salary",
    description: "Monthly salary for maintenance staff",
    amount: "$2,500.00",
    status: "Paid"
  },
  {
    propertyAddress: "2000 Sample",
    unitNumber: 202,
    type: "Expense",
    transactionDate: "2024-03-20",
    transactionType: "Maintenance",
    description: "HVAC system repair",
    amount: "$750.00",
    status: "Paid"
  },
  {
    propertyAddress: "123 Sydney",
    unitNumber: 434,
    type: "Income",
    transactionDate: "2024-02-2",
    transactionType: "Rent",
    description: "Property Rent",
    amount: "$2,250.00",
    status: "Paid"
  },
  {
    propertyAddress: "123 Madrid",
    unitNumber: 434,
    type: "Expense",
    transactionDate: "2024-02-2",
    transactionType: "Employee Salary",
    description: "Monthly salary for maintenance staff",
    amount: "$2,250.00",
    status: "Paid"
  }

];

*/

function FinanceTable() {
  // to be removed from here
  const transactions = [
    {
      propertyAddress: "1000 Example",
      unitNumber: 101,
      type: "Expense",
      transactionDate: "2024-03-15",
      transactionType: "Employee Salary",
      description: "Monthly salary for maintenance staff",
      amount: "$2,500.00",
      status: "Paid"
    },
    {
      propertyAddress: "2000 Sample",
      unitNumber: 202,
      type: "Expense",
      transactionDate: "2024-03-20",
      transactionType: "Maintenance",
      description: "HVAC system repair",
      amount: "$750.00",
      status: "Paid"
    },
    {
      propertyAddress: "123 Sydney",
      unitNumber: 434,
      type: "Income",
      transactionDate: "2024-02-2",
      transactionType: "Rent",
      description: "Property Rent",
      amount: "$2,250.00",
      status: "Paid"
    },
    {
      propertyAddress: "123 Madrid",
      unitNumber: 434,
      type: "Expense",
      transactionDate: "2024-02-2",
      transactionType: "Employee Salary",
      description: "Monthly salary for maintenance staff",
      amount: "$2,250.00",
      status: "Paid"
    }

  ];

  const budget = 5000; // retrieve from database

  // calculates expenses, budget, income
  // not sure how it will work with database
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = new Date(transaction.transactionDate).getMonth();
    acc[month] = acc[month] || { transactions: [], totalIncome: 0, totalExpenses: 0, remainingBudget: budget };
    acc[month].transactions.push(transaction);
    const amount = parseFloat(transaction.amount.replace('$', '').replace(',', ''));
    if (transaction.status === 'Paid') {
      if (transaction.type === 'Income') {
        acc[month].totalIncome += amount;
      } else if (transaction.type === 'Expense') {
        acc[month].totalExpenses += amount;
      }
    }
    acc[month].remainingBudget = budget - acc[month].totalExpenses;
    return acc;
  }, {});

  return (
      <div className="overflow-x-auto">
        {/*makes a table for each month for transactions and budget*/}
        {Object.keys(monthlyData).map((monthIndex) => (
            <div key={monthIndex} className="mb-8">
              <h2 className="text-lg font-semibold mt-4 mb-2">
                {new Date(0, monthIndex).toLocaleString("default", {
                  month: "long",
                })}
              </h2>
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                  {monthlyData[monthIndex].transactions.map((transaction, index) => (
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
              </div>

              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-blue-400 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Budget Information</th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Amount</th>
                  </tr>
                  <tr className="bg-white divide-y divide-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Initial Budget</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${budget}</td>
                  </tr>
                  <tr className="bg-gray-50 divide-y divide-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Total Expenses</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${monthlyData[monthIndex].totalExpenses}</td>
                  </tr>
                  <tr className="bg-white divide-y divide-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Remaining Budget</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${monthlyData[monthIndex].remainingBudget}</td>
                  </tr>
                  <tr className="bg-gray-50 divide-y divide-gray-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Total Income</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">${monthlyData[monthIndex].totalIncome}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
        ))}
      </div>
  );
}
export default FinanceTable;