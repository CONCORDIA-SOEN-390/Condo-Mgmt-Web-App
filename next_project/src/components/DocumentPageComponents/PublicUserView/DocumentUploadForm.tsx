import React, { useState } from 'react';

const properties = [
    { address: "123 Main St", unitNumber: "101" },
    { address: "456 Elm St", unitNumber: "202" },
    { address: "789 Pine St", unitNumber: "303" },
  ];

export default function DocumentUploadForm() {
  const [documentType, setDocumentType] = useState('');
  const [otherDocumentType, setOtherDocumentType] = useState('');
  const [document, setDocument] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState('');

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    console.log('Uploading Document...');
  };

  return (
    <div className="bg-sky-100 min-h-screen p-5">
      <form onSubmit={handleDocumentUpload} className="max-w-lg mx-auto">
        <h6 className="text-blue-800 font-semibold text-lg mb-6">Upload Document</h6>
        
        <div className="mb-4">
          <label htmlFor="property" className="block text-sm font-bold text-blue-700 mb-2">
            Property
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="property"
            value={selectedProperty}
            onChange={(e) => setSelectedProperty(e.target.value)}
          >
            <option value="">Select Property</option>
            {properties.map((property, index) => (
              <option key={index} value={`${property.address} Unit ${property.unitNumber}`}>
                {`${property.address} Unit ${property.unitNumber}`}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="documentType" className="block text-sm font-bold text-blue-700 mb-2">
            Document Type
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="documentType"
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
          >
            <option value="">Select Document Type</option>
            <option value="identification">Identification</option>
            <option value="proofOfResidence">Proof of Residence</option>
            <option value="employmentLetter">Employment Letter</option>
            <option value="other">Other</option>
          </select>
        </div>

        {documentType === 'other' && (
          <div className="mb-4">
            <label htmlFor="otherDocumentType" className="block text-sm font-bold text-blue-700 mb-2">
              Other Document Type
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="otherDocumentType"
              type="text"
              placeholder="Enter Document Type"
              value={otherDocumentType}
              onChange={(e) => setOtherDocumentType(e.target.value)}
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="document" className="block text-sm font-bold text-blue-700 mb-2">
            Upload Document
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="document"
            type="file"
            onChange={(e) => setDocument(e.target.files[0])}
          />
        </div>

        <div className="flex justify-center mt-6">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}