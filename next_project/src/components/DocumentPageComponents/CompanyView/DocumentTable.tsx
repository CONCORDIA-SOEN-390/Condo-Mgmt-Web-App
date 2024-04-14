import React, { useState, useEffect } from 'react';

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

  return (
      <div className="overflow-x-auto">
        {error && <div>Error: {error}</div>}
        {documents.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-400 text-white">
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
                  <tr key={document.document_id}>
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
  );
};

export default DocumentTable;
