import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarProps } from 'react-calendar';
import Facility from "@/components/ReservationPageComponents/CompanyView/AvailableFacilityTable"


interface ReserveFacilityPopupProps {
  // @ts-ignore
  facility: Facility;
  userId: number;
  propertyId: number;
  onReservationSubmit: (reservationDetails: any) => void;
  onCancel: () => void;
}

function ReserveFacilityPopup({ facility, userId, propertyId, onReservationSubmit, onCancel }: ReserveFacilityPopupProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  if (!facility) {
    throw new Error("Facility is null");
  }

  const handleDateChange = (date: CalendarProps['value']) => {
    setSelectedDate(date as Date); // Convert Value to Date if necessary
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!facility) {
        throw new Error("Facility is null");
      }

      const formattedStartTime = `${selectedDate.toISOString().slice(0, 10)} ${startTime}:00.000000 +00:00`;
      const formattedEndTime = `${selectedDate.toISOString().slice(0, 10)} ${endTime}:00.000000 +00:00`;

      const response = await fetch("/api/addReservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facilityId: facility.facility_id,
          userId: userId,
          propertyId: propertyId,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add reservation");
      }

      // Pass reservationDetails to onReservationSubmit
      onReservationSubmit({
        facilityId: facility.facility_id,
        userId: userId,
        propertyId: propertyId,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      });
    } catch (error) {
      console.error("Error adding reservation:", error);
    }
  };



  const isToday = (date: Date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
  };

  const tileClassName = ({ date }: { date: Date }) => {
    if (date.getTime() === selectedDate.getTime()) {
      return "bg-stone-300";
    }
    if (isToday(date)) {
      return "bg-stone-200";
    }
    return "";
  };


  return (
    <div className="popup bg-white p-6 rounded-lg flex flex-col">
      <strong className="p-3">Reserve Facility</strong>
      <form onSubmit={handleSubmit} className="flex flex-col flex-grow">
        <div className="form-group text-lg p-3">
          <label htmlFor="description">Description: {facility.description}</label>
        </div>
        <div className="form-group text-lg p-3 flex-grow flex">
          <div className="flex flex-col mr-4">
            <label htmlFor="date">Date: {selectedDate.toDateString()}</label>
            <Calendar
              value={selectedDate}
              onChange={handleDateChange}
              className="mb-4 p mt-3"
              tileClassName={tileClassName}
            />
          </div>
          <div className="flex flex-col pt-9">
            <label htmlFor="startTime">Start Time:</label>
            <input
              type="time"
              value={startTime}
              onChange={handleStartTimeChange}
              className="mb-4 p mt-3"
            />
            <label htmlFor="endTime">End Time:</label>
            <input
              type="time"
              value={endTime}
              onChange={handleEndTimeChange}
              className="mb-4 p mt-3"
            />
          </div>
        </div>
        <div className="form-group flex justify-between">
          <button
            type="submit"
            className="bg-zinc-500 hover:bg-zinc-600 text-lg text-white px-4 py-2 rounded ml-3"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-zinc-500 hover:bg-zinc-600 text-lg text-white px-4 py-2 rounded mr-3"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReserveFacilityPopup;