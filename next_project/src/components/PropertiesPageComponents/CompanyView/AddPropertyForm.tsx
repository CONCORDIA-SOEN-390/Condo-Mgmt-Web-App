import React, { useState, useContext } from "react";
import { UserContext } from "@/context/userInfoContext";

function AddPropertyForm({ userId }) {
  const [numberOfUnits, setNumberOfUnits] = useState(0);
  const [numberOfParkingSpaces, setNumberOfParkingSpaces] = useState(0);
  const [numberOfLockers, setNumberOfLockers] = useState(0);
  const [numberOfFloors, setNumberOfFloors] = useState(0);
  const [numberOfUnitsPerFloor, setNumberOfUnitsPerFloor] = useState(0);
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [defaultUnitSqft, setDefaultUnitSqft] = useState(0);
  const [defaultUnitPpSqft, setDefaultUnitPpSqft] = useState(0);
  const [defaultLockerFee, setDefaultLockerFee] = useState(0);
  const [defaultParkingFee, setDefaultParkingFee] = useState(0);
  const [propertyType, setPropertyType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = async () => {
    if (propertyName.trim() === "" || address.trim() === "" || propertyType.trim() === "") {
      setErrorMessage("Please fill in all required fields.");
    } else {
      try {
        const response = await fetch('/api/addproperty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            propertyName,
            address,
            propertyType,
            numberOfUnits,
            numberOfFloors,
            numberOfUnitsPerFloor,
            numberOfParkingSpaces,
            numberOfLockers,
            defaultUnitSqft,
            defaultUnitPpSqft,
            defaultLockerFee,
            defaultParkingFee,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          setErrorMessage("Form Submitted Successfully!");
          // Clear form fields if submission successful
          setNumberOfUnits(0);
          setNumberOfFloors(0);
          setNumberOfUnitsPerFloor(0);
          setNumberOfParkingSpaces(0);
          setNumberOfLockers(0);
          setPropertyName("");
          setAddress("");
          setPropertyType("");
          setDefaultUnitSqft(0);
          setDefaultUnitPpSqft(0);
          setDefaultLockerFee(0);
          setDefaultParkingFee(0);
        } else {
          setErrorMessage(data.message || 'An error occurred.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred while submitting the form.');
      }
    }
  };

  const handleCancel = () => {
    setNumberOfUnits(0);
    setNumberOfFloors(0);
    setNumberOfUnitsPerFloor(0);
    setNumberOfParkingSpaces(0);
    setNumberOfLockers(0);
    setPropertyName("");
    setAddress("");
    setPropertyType("");
    setDefaultUnitSqft(0);
    setDefaultUnitPpSqft(0);
    setDefaultLockerFee(0);
    setDefaultParkingFee(0);
  };

  return (
      <div className="h-screen">
        <div className="bg-sky-100 min-h-screen p-5">
          <h6 className="text-blue-800 font-semibold text-lg mb-6">Add Property</h6>
          <div>
            <div className="mb-4">
              <label htmlFor="Address" className="block text-sm font-bold text-blue-700 mb-2">Address</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="Address"
                  placeholder="Enter Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="propertyName" className="block text-sm font-bold text-blue-700 mb-2">Property Name</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="propertyName"
                  placeholder="Enter Property Name"
                  value={propertyName}
                  onChange={(e) => setPropertyName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="propertyType" className="block text-sm font-bold text-blue-700 mb-2">Property Type</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  name="propertyType"
                  placeholder="Enter Property Type"
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="numberOfFloors" className="block text-sm font-bold text-blue-700 mb-2">Number of Floors</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="numberOfFloors"
                  value={numberOfFloors}
                  onChange={(e) => setNumberOfFloors(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="numberOfUnitsPerFloor" className="block text-sm font-bold text-blue-700 mb-2">Number of Units Per Floor</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="numberOfUnitsPerFloor"
                  value={numberOfUnitsPerFloor}
                  onChange={(e) => setNumberOfUnitsPerFloor(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="numberOfParkingSpaces" className="block text-sm font-bold text-blue-700 mb-2">Number of Parking Spaces</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="numberOfParkingSpaces"
                  value={numberOfParkingSpaces}
                  onChange={(e) => setNumberOfParkingSpaces(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="numberOfLockers" className="block text-sm font-bold text-blue-700 mb-2">Number of Lockers</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="numberOfLockers"
                  value={numberOfLockers}
                  onChange={(e) => setNumberOfLockers(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div>
            <div className="mb-4">
              <label htmlFor="defaultUnitSqft" className="block text-sm font-bold text-blue-700 mb-2">Default Unit Sqft</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="defaultUnitSqft"
                  value={defaultUnitSqft}
                  onChange={(e) => setDefaultUnitSqft(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="defaultUnitPpSqft" className="block text-sm font-bold text-blue-700 mb-2">Default Unit Price Per Sqft</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="defaultUnitPpSqft"
                  value={defaultUnitPpSqft}
                  onChange={(e) => setDefaultUnitPpSqft(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="defaultLockerFee" className="block text-sm font-bold text-blue-700 mb-2">Default Locker Fee</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="defaultLockerFee"
                  value={defaultLockerFee}
                  onChange={(e) => setDefaultLockerFee(parseInt(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="defaultParkingFee" className="block text-sm font-bold text-blue-700 mb-2">Default Parking Fee</label>
              <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="number"
                  name="defaultParkingFee"
                  value={defaultParkingFee}
                  onChange={(e) => setDefaultParkingFee(parseInt(e.target.value))}
              />
            </div>
          </div>
          <div className="text-red-500 py-2">
            {errorMessage && (
                <p>
                  {errorMessage}
                </p>
            )}
          </div>
          <div className="flex justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
  );
}

export default AddPropertyForm;
