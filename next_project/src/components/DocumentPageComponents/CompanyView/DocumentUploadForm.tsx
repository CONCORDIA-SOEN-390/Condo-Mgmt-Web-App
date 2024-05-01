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
  const [document, setDocument] = useState(undefined); // Update initial state to undefined
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('');



  return (
      <div className="bg-sky-100 min-h-screen p-5">

      </div>
  );
}
