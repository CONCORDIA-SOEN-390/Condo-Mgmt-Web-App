// Example of data array returned from DB
const fees = [
    {
      propertyNumber: 1,
      dueDate: "2024-03-01",
      feeType: "Maintenance",
      description: "Monthly maintenance fee",
      amountDue: "$300.00",
      status: "Paid"
    },
    {
      propertyNumber: 2,
      dueDate: "2024-04-01",
      feeType: "Utilities",
      description: "Water and Heating",
      amountDue: "$150.00",
      status: "Pending"
    },
    {
      propertyNumber: 3,
      dueDate: "2024-05-01",
      feeType: "Special Assessment",
      description: "Lobby renovation",
      amountDue: "$500.00",
      status: "Pending"
    }
  ];
  

export default function FinanceTable() {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Due Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Fee Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount Due</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                </tr>
            </thead>
            <tbody>
                {fees.map((fee, id) => {
                    return (
                        <tr key={id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.propertyNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.dueDate}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.feeType}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.amountDue}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.status}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}