"use client";
import React, { useState } from "react";
import ReserveFacilityPopup from "./ReserveFacilityPopup";

interface Facility {
  type: string;
  description: string;
}

const facility: Facility[] = [
  {
    type: "Pool",
    description: "Indoor pool",
  },
  {
    type: "Gym",
    description: "Fully equipped gym",
  },
  {
    type: "Pool",
    description: "Indoor pool",
  },
  {
    type: "Gym",
    description: "Fully equipped gym",
  },
  {
    type: "Pool",
    description: "Indoor pool",
  },
  {
    type: "Gym",
    description: "Fully equipped gym",
  },
];

export default function AvailableFacilityTable() {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(
    null
  );

  const handleReserveClick = (facilityItem: Facility) => {
    setSelectedFacility(facilityItem);
    setShowPopup(true);
  };

  const handleReservationSubmit = (reservationDetails: any) => {
    console.log("Reservation details:", reservationDetails);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <div className="overflow-y-auto h-64">
      <table className="min-w-full divide-y">
        <tbody>
          {facility.map((facilityItem, index) => (
            <tr className="grid grid-cols-3 bg-stone-300 mb-4" key={index}>
              <td className="px-6 py-4 mt-2 text-sm text-black">
                Facility: {facilityItem.type}
              </td>
              <td className="px-6 py-4 ml-4 mt-2 text-sm text-black">
                Description: {facilityItem.description}
              </td>
              <td className="px-6 py-4 text-sm text-black text-right">
                <button
                  onClick={() => handleReserveClick(facilityItem)}
                  className="bg-zinc-500 hover:bg-zinc-600 text-sm mr-7 text-white py-2 px-4 rounded mr-5"
                >
                  Reserve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Render the popup if showPopup is true */}
      {showPopup && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <ReserveFacilityPopup
            facility={selectedFacility}
            onReservationSubmit={handleReservationSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}
