"use client";
import React, { useState } from "react";

const initialFacility = [
  {
    id: "#JDLAMLFM",
    description: "Indoor pool",
    date: "10/22/2024",
    status: "Available",
  },
  {
    id: "#KJANKNCFA",
    description: "Fully equipped gym",
    date: "10/22/2024",
    status: "Pending",
  },
  {
    id: "#JDLAMLFM",
    description: "Indoor pool",
    date: "10/22/2024",
  },
  {
    id: "#KJANKNCFA",
    description: "Fully equipped gym",
    date: "10/22/2024",
  },
  {
    id: "#JDLAMLFM",
    description: "Indoor pool",
    date: "10/22/2024",
  },
  {
    id: "#KJANKNCFA",
    description: "Fully equipped gym",
    date: "10/22/2024",
  },
];

export default function MyReservationTable() {
  const [facility, setFacility] = useState(initialFacility);

  const handleCancel = (index: number) => {
    // Add logic to delete row from the database

    // Remove row from the table
    const updatedFacility = [...facility];
    updatedFacility.splice(index, 1);
    setFacility(updatedFacility);
  };

  return (
    <div className="overflow-y-auto h-64">
      <table className="min-w-full divide-y">
        <tbody>
          {facility.map((facilityItem, index) => (
            <tr className="grid grid-cols-4 bg-stone-300 mb-4" key={index}>
              <td className="px-6 py-4 text-sm mt-2 text-black">
                Reservation ID: {facilityItem.id}
              </td>
              <td className="px-6 py-4 text-sm mt-2 text-black">
                Description: {facilityItem.description}
              </td>
              <td className="px-10 py-4 text-sm mt-2 ml-4 text-black">
                Date: {facilityItem.date}
              </td>
              <td className="px-14 py-4 text-sm text-black text-left">
                <div>
                  <button
                    className="bg-zinc-500 hover:bg-zinc-600 text-sm ml-16 text-white py-2 px-5 rounded"
                    onClick={() => handleCancel(index)}
                  >
                    Cancel
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
