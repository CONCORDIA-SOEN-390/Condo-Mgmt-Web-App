import React, { useState } from 'react';

// Array of property addresses
const propertyAddresses = [
  "123 Main St",
  "456 Elm St",
  "789 Pine St",
  "Corporate"
];

// Predefined options for the document's destination
const documentDestinations = [
  "Legal Department",
  "Finance Department",
  "Maintenance Department",
  "Human Resources",
  "Operations",
  "Corporate Management"
];

export default function DocumentUploadForm() {
  const [documentType, setDocumentType] = useState('');
  const [document, setDocument] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');

  const handleDocumentUpload = (e) => {
    e.preventDefault();
    // Implement the logic to handle the document upload here
    console.log('Document to upload:', { documentType, selectedAddress, selectedDestination, document });
  };

  return (
    <div className="bg-sky-100 min-h-screen p-5">
      <form onSubmit={handleDocumentUpload} className="max-w-lg mx-auto space-y-4">
        <h6 className="text-blue-800 font-semibold text-lg mb-6">Upload Document</h6>

        {/* Property Address Select */}
        <div className="mb-4">
          <label htmlFor="propertyAddress" className="block text-sm font-bold text-blue-700 mb-2">
            Property Address
          </label>
          <select
            id="propertyAddress"
            className="block w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            <option value="">Select Property Address</option>
            {propertyAddresses.map((address, index) => (
              <option key={index} value={address}>
                {address}
              </option>
            ))}
          </select>
        </div>

        {/* Document Destination Select */}
        <div className="mb-4">
          <label htmlFor="documentDestination" className="block text-sm font-bold text-blue-700 mb-2">
            Document Destination
          </label>
          <select
            id="documentDestination"
            className="block w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
          >
            <option value="">Select Destination</option>
            {documentDestinations.map((destination, index) => (
              <option key={index} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </div>

        {/* Document Upload Input */}
        <div className="mb-4">
          <label htmlFor="document" className="block text-sm font-bold text-blue-700 mb-2">
            Upload Document
          </label>
          <input
            id="document"
            type="file"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            onChange={(e) => setDocument(e.target.files[0])}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button 
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
