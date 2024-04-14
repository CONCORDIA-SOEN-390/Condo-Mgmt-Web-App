import React from 'react';

const documents = [
  {
    type: "Corporate Policy",
    title: "Employee Handbook",
    propertyAddress: "Corporate",
    uploadDate: "2023-01-01",
    uploadedBy: "HR Department",
    status: "Verified"
  },
  {
    type: "Proof of Ownership",
    title: "Title Deed for 1000 Example Street",
    propertyAddress: "1000 Example Street",
    uploadDate: "2023-01-15",
    uploadedBy: "Legal Team",
    status: "Verified"
  },
  {
    type: "Financial Document",
    title: "Annual Financial Statement",
    propertyAddress: "Corporate",
    uploadDate: "2023-02-20",
    uploadedBy: "Finance Department",
    status: "Pending Verification"
  },
  {
    type: "Insurance Policy",
    title: "General Liability Insurance",
    propertyAddress: "Corporate",
    uploadDate: "2023-03-05",
    uploadedBy: "Operations Manager",
    status: "Verified"
  },
  {
    type: "Maintenance Record",
    title: "HVAC System Maintenance Log",
    propertyAddress: "2000 Sample Avenue",
    uploadDate: "2023-04-10",
    uploadedBy: "Facilities Manager",
    status: "Verified"
  }
];

export default function DocumentTable() {
  return (
    <div className="overflow-x-auto p-3">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Document Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Property Address / Corporate</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date Uploaded</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Uploaded by</th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {documents.map((document, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.type}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.propertyAddress}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.uploadDate}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.uploadedBy}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
