"use client";
import React, { useState } from "react";
import "./AddPropertyForm.css";

function AddPropertyForm() {
  const [numberOfUnits, setNumberOfUnits] = useState(0);
  const [numberOfParkingSpaces, setNumberOfParkingSpaces] = useState(0);
  const [numberOfLockers, setNumberOfLockers] = useState(0);
  const [numberOfFloors, setNumberOfFloors] = useState(0);
  const [numberOfUnitsPerFloor, setNumberOfUnitsPerFloor] = useState(0);
  const [propertyName, setPropertyName] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConfirm = async () => {
    if (propertyName.trim() === "" || address.trim() === "") {
      setErrorMessage("Please fill in all required fields.");
    } else {
      try {
        const response = await fetch('/api/addproperty', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            propertyName,
            address,
            numberOfUnits,
            numberOfFloors,
            numberOfUnitsPerFloor,
            numberOfParkingSpaces,
            numberOfLockers,
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
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="mainAddPropertyContainer">
        <h6 className="mainTitle">Add Property</h6>
        <div className="row">
          <div className="textboxTitlePairContainer">
              <h2 className="titles">Address</h2>
              <input 
                className="textbox"
                type="text"
                name="Address"
                placeholder="Enter Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}/>
          </div>
          <div className="textboxTitlePairContainer">
              <h2 className="titles">Property Name</h2>
              <input 
                className="textbox"
                type="text"
                name="propertyName"
                placeholder="Enter Property Name"
                value={propertyName}
                onChange={(e) => setPropertyName(e.target.value)}/>
          </div>
        </div>
        <div className="row">
          <div className="textboxTitlePairContainer">
              <h2 className="titles">Number of Units</h2>
              <input 
                className="textbox"
                type="number"
                name="numberOfUnits"
                value={numberOfUnits}
                required
                onChange={(e) => (setNumberOfUnits(e.target.value))}/>
          </div>
          <div className="textboxTitlePairContainer">
              <h2 className="titles">Number of Floors</h2>
              <input 
                className="textbox"
                type="number"
                name="numberOfUnits"
                value={numberOfFloors}
                required
                onChange={(e) => (setNumberOfFloors(e.target.value))}/>
          </div>
{/*           <Input title="Number of Units Per Floor"     Not necessary?
            className="textbox"
            type="number"
            name="numberOfUnits"
            value={numberOfUnitsPerFloor}
            required
            onChange={(e) => (setNumberOfUnitsPerFloor(e.target.value))}
          /> */}
        </div>
        <div className="row">
          <div className="textboxTitlePairContainer">
              <h2 className="titles">Number of Parking Spaces</h2>
              <input 
                className="textbox"
                type="number"
                name="numberOfParkingSpaces"
                value={numberOfParkingSpaces}
                required
                onChange={(e) => (setNumberOfParkingSpaces(e.target.value))}/>
          </div>
          <div className="textboxTitlePairContainer">
              <h2 className="titles">Number of Lockers</h2>
              <input 
                className="textbox"
                type="number"
                name="numberOfLockers"
                value={numberOfLockers}
                required
                onChange={(e) => (setNumberOfLockers(e.target.value))}/>
          </div>
        </div>
        <div className="errorContainer">
          {errorMessage && (
            <p
              style={{
                color: errorMessage.includes("Successfully") ? "green" : "red",
              }}
            >
              {errorMessage}
            </p>
          )}
        </div>
        <div className="row ConfirmationButtonContainer">
          <button className="ConfirmationButton" onClick={handleConfirm}>
            Confirm
          </button>
          <button className="ConfirmationButton" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPropertyForm;
