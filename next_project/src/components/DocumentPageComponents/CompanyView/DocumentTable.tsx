import React, { useState, useEffect } from 'react';
import {PiPlusSquareFill} from "react-icons/pi";
import DocumentUploadForm from "@/components/DocumentPageComponents/CompanyView/DocumentUploadForm";
interface Document {
  document_id: number;
  property_id: number;
  document_type: string;
  document_title: string;
  uploaded_by: string;
  date: string;
  size: number;
  url: string;
}

interface DocumentTableProps {
  userId: number;
  propertyId: number;
}

const DocumentTable: React.FC<DocumentTableProps> = ({ userId, propertyId }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddExpense, setShowAddExpense] = useState<boolean>(false);


  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/getDocumentByProperty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ propertyId })
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchDocuments();
  }, [propertyId]);

  const toggleAddExpense = () => {
    setShowAddExpense(prevState => !prevState);
  };

  return (
      <div className="overflow-x-auto">
        <div className="bg-gray-50 rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Documents</h2>
            <button onClick={toggleAddExpense} className="flex items-center bg-blue-300 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              <PiPlusSquareFill className="mr-2" />
              Add Document
            </button>
          </div>
          {showAddExpense && <DocumentUploadForm propertyId={propertyId} userId={userId} />}
        {error && <div>Error: {error}</div>}
        {documents.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="min-w-full bg-[#DAECFB] text-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Document ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Document Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Uploaded By</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Url</th>
              </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
              {documents.map(document => (
                  <tr key={document.document_id} >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.document_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.document_type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.document_title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.uploaded_by}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.size} bytes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{document.url}</td>
                  </tr>
              ))}
              </tbody>
            </table>

        )}
      </div>
      </div>
  );
};

export default DocumentTable;
