import React, { useEffect, useState } from 'react';
import { PiPlusSquareFill } from "react-icons/pi";
import AddIncomeForm from "@/components/FinancePageComponents/CompanyView/AddIncomeForm";

interface FinanceTableProps {
    propertyId: number;
    userId: number;
}

interface Income {
    income_id: number;
    company_id: number;
    income_value: number;
    occurence: string;
    description: string;
    income_date: string;
    property_id: number;
}

const IncomeTable: React.FC<FinanceTableProps> = ({ propertyId, userId }) => {
    const [incomes, setIncomes] = useState<Income[]>([]);
    const [showAddIncome, setShowAddIncome] = useState<boolean>(false);
    const [filterYear, setFilterYear] = useState<number | null>(null); // State for filter year

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await fetch('/api/getIncomeByProperty', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ propertyId })
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data: Income[] = await response.json();
                console.log('Fetched data:', data);
                setIncomes(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchIncomes();
    }, [propertyId]);

    const toggleAddIncome = () => {
        setShowAddIncome(prevState => !prevState);
    };

    // calculate total income per year
    const calculateTotalIncomeByYear = (year: number) => {
        return incomes
            .filter(income => new Date(income.income_date).getFullYear() === year)
            .reduce((total, income) => total + income.income_value, 0);
    };

    return (
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-4">Income</h2>
                <button onClick={toggleAddIncome} className="flex items-center bg-blue-300 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    <PiPlusSquareFill className="mr-2" />
                    Add Income
                </button>
            </div>
            <div className="p-5 text-black text-xl">
                {showAddIncome && <AddIncomeForm propertyId={propertyId} />}
                <input
                    type="number"
                    placeholder="Filter by year"
                    value={filterYear || ''}
                    onChange={(e) => setFilterYear(parseInt(e.target.value))}
                />
            </div>
            <div className="overflow-x-auto">
                {incomes.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#DAECFB] text-black">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Income ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Company ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Income Value</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Occurrence</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {incomes
                            .filter(income => !filterYear || new Date(income.income_date).getFullYear() === filterYear)
                            .map(income => (
                                <tr key={income.income_id} className="bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.income_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.company_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.income_value}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.occurence}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{income.income_date}</td>
                                </tr>
                            ))
                        }
                        {filterYear && incomes.some(income => new Date(income.income_date).getFullYear() === filterYear) && (
                            <tr className="bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold" colSpan={2}>Total Income for {filterYear}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold">{calculateTotalIncomeByYear(filterYear)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-bold" colSpan={3}></td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                ) : (
                    <div>No income found</div>
                )}
            </div>
        </div>
    );
}

export default IncomeTable;
