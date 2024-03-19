"use client";
import React, { useState } from "react";

function AddPropertyForm() {

  const [address, setAddress] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState(0);
  const [propertyType, setPropertyType] = useState(''); // 'rental' or 'personal'
  const [status, setStatus] = useState(''); // 'owner' or 'occupant'
  const [ownerName, setOwnerName] = useState('');
  const [leaseDocument, setLeaseDocument] = useState(null);
  const [proofOfOwnership, setProofOfOwnership] = useState(null);
  const [occupantName, setOccupantName] = useState('');
  const [rentalLicense, setRentalLicense] = useState(null);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function validateInput() {
    let feedback = '';
    const addressRegex = /^\d+\s[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  
    if (!addressRegex.test(address.trim())) {
      feedback += '- Invalid Address\n';
    }
  
    if (apartmentNumber <= 0 || isNaN(apartmentNumber)) {
      feedback += '- Invalid Apartment Number\n';
    }
  
    if (propertyType !== 'rental' && propertyType !== 'personal') {
      feedback += '- Invalid Property Type\n';
    }


    if (propertyType === 'rental') {
      if (status !== 'owner' && status !== 'occupant') {
        feedback += '- Invalid Status\n';
      }
      
      if (status === 'occupant') {
        if (!ownerName.trim()) {
          feedback += '- Owner\'s Name required for occupants\n';
        }
        if (!leaseDocument) {
          feedback += '- Lease Document is required from occupants\n';
        }
      }

      if (status === 'owner') {
        if (occupantName && !leaseDocument) {
          feedback += '- Lease Document is required from owners, if unit is not vacant\n';
        }
        if (!rentalLicense) {
          feedback += '- Rental Property License is required for rental properties\n';
        }
      }
    }

    if ( (propertyType === 'personal' || (propertyType === 'rental' && status === 'owner')) && !proofOfOwnership){
      feedback += '- Proof of ownership required for owners\n';
    }

    if (feedback !== ""){
      feedback = '*Attention required for the following before submission:\n' + feedback;
    }
    return feedback;
  }

  const handleConfirm = async () => {
    if (!validateInput()) {
      try {
        const response = await fetch('/api/addproperty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address,
            apartmentNumber,
            propertyType,
            status,
            ownerName,
            leaseDocument,
            proofOfOwnership,
            occupantName,
            rentalLicense
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setAddress("");
          setApartmentNumber(0);
          setPropertyType("");
          setStatus("");
          setOwnerName("");
          setOccupantName("");
          setLeaseDocument(null);
          setProofOfOwnership(null);
          setRentalLicense(null);

          setIsSubmitted(true);
        } else {
          setErrorMessage(data.message || 'An error occurred.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred while submitting the form.');
      }
    }
  };

  function handleSubmit(event){
    event.preventDefault();
    setIsSubmitted(true);
  }
  const handleCancel = () => {
    setAddress("");
    setApartmentNumber(0);
    setPropertyType("");
    setStatus("");
    setOwnerName("");
    setOccupantName("");
    setLeaseDocument(null);
    setProofOfOwnership(null);
    setRentalLicense(null);
  };

  return (
    <div className="bg-sky-100 min-h-screen p-5">
      <form onSubmit={handleSubmit}>
        <h6 className="text-blue-800 text-lg font-semibold mb-6">Add Condo Unit Request</h6>
        <div className="mb-4">
          <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="address"
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="apartmentNumber">
            Condo Unit Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="apartmentNumber"
            type="number"
            placeholder="Enter Apartment Number"
            value={apartmentNumber}
            required
            onChange={(e) => setApartmentNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="propertyType">
            Property Type
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="propertyType"
            value={propertyType}
            onChange={(e) => {setPropertyType(e.target.value)}}
          >
            <option value="">Select Property Type</option>
            <option value="rental">Rental</option>
            <option value="personal">Personal</option>
          </select>
        </div>
        {propertyType === "rental" && (
          <div className="mb-4">
          <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="status">
            Are you the owner or occupant?
          </label>
          <select
            className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="owner">Owner</option>
            <option value="occupant">Occupant</option>
          </select>
        </div>
        )}
        

        {status === 'occupant' && (
          <div>
            {/* Inputs for occupant to provide owner's name and lease document */}
            <div className="mb-4">
              <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="ownerName">
                Owner's Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ownerName"
                type="text"
                placeholder="Enter Owner's Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                required />
            </div>
            <div className="mb-4">
              <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="leaseDocument">
                Lease Document
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="leaseDocument"
                type="file"
                onChange={(e) => setLeaseDocument(e.target.files[0])}
                required />
            </div>
          </div>
        )}

        {(status === 'owner' || propertyType === 'personal') && (
          <div>
            {/* Conditional inputs for owners */}
            <div className="mb-4">
              <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="proofOfOwnership">
                Proof of Ownership
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="proofOfOwnership"
                type="file"
                onChange={(e) => setProofOfOwnership(e.target.files[0])}
                required />
            </div>

            {propertyType === 'rental' && (
              
              <div>
                <div className="mb-4">
                  <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="rentalLicense">
                    Rental Property License
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="rentalLicense"
                    type="file"
                    onChange={(e) => setRentalLicense(e.target.files[0])}
                    required />
                </div>
                <div className="mb-4">
                  <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="occupantName">
                    Occupant's Name (if applicable)
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="occupantName"
                    type="text"
                    placeholder="Enter Occupant's Name"
                    value={occupantName}
                    onChange={(e) => setOccupantName(e.target.value)} />
                </div>
                <div className="mb-4">
                  <label className="block text-blue-700 text-sm font-bold mb-2" htmlFor="leaseDocument">
                    Lease Document
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="leaseDocument"
                    type="file"
                    onChange={(e) => setLeaseDocument(e.target.files[0])} />
                </div>
              </div>
            )}
          </div>
        )}


        <div className="flex items-center justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit">
            Submit Request
          </button>
        </div>

      </form>
      
      <div>
        {!isSubmitted ? '' : <pre>{validateInput()}</pre>}
      </div>
    </div>
  );
}

export default AddPropertyForm;
