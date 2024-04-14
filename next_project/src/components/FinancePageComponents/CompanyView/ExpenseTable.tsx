import React, { useEffect, useState } from 'react';
import CardHeader from "@/components/GeneralComponents/CardHeader";
import { PiPlusSquareFill } from "react-icons/pi";
import AddExpenseForm from "@/components/FinancePageComponents/CompanyView/AddExpenseForm";

interface FinanceTableProps {
  propertyId: number;
  userId: number;
}

interface Expense {
  expense_id: number;
  company_id: number;
  expense_value: number;
  occurence: string;
  description: string;
  expense_date: string;
  property_id: number;
}

const ExpenseTable: React.FC<FinanceTableProps> = ({ propertyId, userId }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);
  const [filterYear, setFilterYear] = useState<number | null>(null); // State for filter year

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await fetch('/api/getExpenseByProperty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ propertyId })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data: Expense[] = await response.json();
        console.log('Fetched data:', data);
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchExpenses();
  }, [propertyId]);

  const toggleAddExpense = () => {
    setShowAddExpense(prevState => !prevState);
  };

  // filter expenses by year
  const filteredExpenses = expenses.filter(expense => {
    if (filterYear === null) {
      return true; // Show all expenses if no filter year is selected
    }
    const expenseYear = new Date(expense.expense_date).getFullYear();
    return expenseYear === filterYear;
  });


  // calculate total expenses by year
  const calculateTotalExpensesByYear = (year: number) => {
    return expenses
        .filter(expense => new Date(expense.expense_date).getFullYear() === year)
        .reduce((total, expense) => total + expense.expense_value, 0);
  };


  return (
      <div className="bg-gray-50 rounded-lg shadow-md p-6">
        <CardHeader title={'Expenses'}>
          <button onClick={toggleAddExpense}><PiPlusSquareFill /></button>
        </CardHeader>
        <div className="p-5 text-black text-xl">
          {showAddExpense && <AddExpenseForm propertyId={propertyId} />}
          {/* Filter input */}
          <input
              type="number"
              placeholder="Filter by year"
              value={filterYear || ''}
              onChange={(e) => setFilterYear(parseInt(e.target.value))}
          />
        </div>
        <div className="overflow-x-auto">
          {filteredExpenses.length > 0 ? (
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
                {filteredExpenses.map(expense => (
                    <tr key={expense.expense_id} className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.expense_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.company_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.expense_value}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.occurence}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.expense_date}</td>
                    </tr>
                ))}

                {filterYear && (
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold" colSpan={2}>Total Expenses for {filterYear}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">{calculateTotalExpensesByYear(filterYear)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold" colSpan={3}></td>
                    </tr>
                )}

                </tbody>
              </table>
          ) : (
              <div>No expense found</div>
          )}
        </div>
      </div>
  );
}

export default ExpenseTable;
