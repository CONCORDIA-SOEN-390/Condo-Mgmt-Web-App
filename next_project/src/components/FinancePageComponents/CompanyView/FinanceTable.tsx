import React, { useEffect, useState } from 'react';

function FinanceTable({ propertyId }) {
  const [expenses, setExpenses] = useState([]);



  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch('/api/getExpenseByProperty', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ propertyId: propertyId })
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Fetched data:', data);
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
      <div className="overflow-x-auto">
        {expenses.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-400 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Expense ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Company ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Expense Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occurrence</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>

              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map(expense => (
                  <tr key={expense.expense_id} className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.expense_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.company_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.expense_value}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.occurence}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.expense_date}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
        {expenses.length === 0 && (
            <div>No expense found</div>
        )}
      </div>
  );
}

export default FinanceTable;
