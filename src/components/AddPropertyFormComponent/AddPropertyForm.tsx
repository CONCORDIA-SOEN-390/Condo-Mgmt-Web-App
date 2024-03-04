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

  const incrementValue = (
    setNumber: {
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (arg0: any): void;
    },
    number: number
  ) => {
    setNumber(number + 1);
  };

  const decrementValue = (
    setNumber: {
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (value: React.SetStateAction<number>): void;
      (arg0: number): void;
    },
    number: number
  ) => {
    if (number > 0) {
      setNumber(number - 1);
    }
  };

  const handleConfirm = () => {
    if (propertyName.trim() === "" || address.trim() === "") {
      setErrorMessage("Please fill in all required fields.");
    } else {
      setErrorMessage("Form Submitted Successfully!");
      setNumberOfUnits(0);
      setNumberOfFloors(0);
      setNumberOfUnitsPerFloor(0);
      setNumberOfParkingSpaces(0);
      setNumberOfLockers(0);
      setPropertyName("");
      setAddress("");
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
            <h2 className="titles">Property Name</h2>
            <input
              className="textbox"
              type="text"
              name="propertyName"
              placeholder="Enter Property Name"
              value={propertyName}
              onChange={(e) => setPropertyName(e.target.value)}
            />
          </div>
          <div className="textboxTitlePairContainer">
            <h2 className="titles">Number of Units</h2>
            <div className="textboxCounterContainer">
              <input
                className="input-field"
                type="text"
                name="numberOfUnits"
                placeholder="1"
                value={numberOfUnits}
                readOnly
              />
              <div className="buttonContainer">
                <button
                  aria-label="units+"
                  className="button plus"
                  onClick={() =>
                    incrementValue(setNumberOfUnits, numberOfUnits)
                  }
                >
                  &#x23F6;
                </button>
                <button
                  aria-label="units-"
                  className="button minus"
                  onClick={() =>
                    decrementValue(setNumberOfUnits, numberOfUnits)
                  }
                >
                  &#x23F7;
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="textboxTitlePairContainer">
            <h2 className="titles">Number of Floors</h2>
            <div className="textboxCounterContainer">
              <input
                className="input-field"
                type="text"
                name="numberOfFloors"
                value={numberOfFloors}
                readOnly
              />
              <div className="buttonContainer">
                <button
                  aria-label="floor+"
                  className="button plus"
                  onClick={() =>
                    incrementValue(setNumberOfFloors, numberOfFloors)
                  }
                >
                  &#x23F6;
                </button>
                <button
                  aria-label="floor-"
                  className="button minus"
                  onClick={() =>
                    decrementValue(setNumberOfFloors, numberOfFloors)
                  }
                >
                  &#x23F7;
                </button>
              </div>
            </div>
          </div>
          <div className="textboxTitlePairContainer">
            <h2 className="titles">Number of Units Per Floor</h2>
            <div className="textboxCounterContainer">
              <input
                className="input-field"
                type="text"
                name="numberOfUnitsPerFloor"
                value={numberOfUnitsPerFloor}
                readOnly
              />
              <div className="buttonContainer">
                <button
                  aria-label="upf+"
                  className="button plus"
                  onClick={() =>
                    incrementValue(
                      setNumberOfUnitsPerFloor,
                      numberOfUnitsPerFloor
                    )
                  }
                >
                  &#x23F6;
                </button>
                <button
                  aria-label="upf-"
                  className="button minus"
                  onClick={() =>
                    decrementValue(
                      setNumberOfUnitsPerFloor,
                      numberOfUnitsPerFloor
                    )
                  }
                >
                  &#x23F7;
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="textboxTitlePairContainer">
            <h2 className="titles">Number of Parking Spaces</h2>
            <div className="textboxCounterContainer">
              <input
                className="input-field"
                type="text"
                name="numberOfParkingSpaces"
                value={numberOfParkingSpaces}
                readOnly
              />
              <div className="buttonContainer">
                <button
                  aria-label="parking+"
                  className="button plus"
                  onClick={() =>
                    incrementValue(
                      setNumberOfParkingSpaces,
                      numberOfParkingSpaces
                    )
                  }
                >
                  &#x23F6;
                </button>
                <button
                  aria-label="parking-"
                  className="button minus"
                  onClick={() =>
                    decrementValue(
                      setNumberOfParkingSpaces,
                      numberOfParkingSpaces
                    )
                  }
                >
                  &#x23F7;
                </button>
              </div>
            </div>
          </div>
          <div className="textboxTitlePairContainer">
            <h2 className="titles">Number of Lockers</h2>
            <div className="textboxCounterContainer">
              <input
                className="input-field"
                type="text"
                name="numberOfLockers"
                value={numberOfLockers}
                readOnly
              />
              <div className="buttonContainer">
                <button
                  aria-label="locker+"
                  className="button plus"
                  onClick={() =>
                    incrementValue(setNumberOfLockers, numberOfLockers)
                  }
                >
                  &#x23F6;
                </button>
                <button
                  aria-label="locker-"
                  className="button minus"
                  onClick={() =>
                    decrementValue(setNumberOfLockers, numberOfLockers)
                  }
                >
                  &#x23F7;
                </button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="titles">Address</h2>
        <input
          className="textbox"
          type="text"
          name="Address"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
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
          <button 
            aria-label="Confirm"
            className="ConfirmationButton" onClick={handleConfirm}>
            Confirm
          </button>
          <button 
            aria-label="Cancel"
            className="ConfirmationButton" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPropertyForm;
