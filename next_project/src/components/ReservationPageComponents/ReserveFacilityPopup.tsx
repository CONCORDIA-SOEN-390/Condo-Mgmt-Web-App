import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ReserveFacilityPopup({ facility, userId, propertyId, onReservationSubmit, onCancel }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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

      // If the response is successful, call the onReservationSubmit callback
      onReservationSubmit();
    } catch (error) {
      console.error("Error adding reservation:", error);
      // Handle error
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
  };

  const tileClassName = ({ date }) => {
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
            <label htmlFor="description">Facility Type: {facility.type}</label>
          </div>
          <div className="form-group text-lg p-3">
            <label htmlFor="description">Description: {facility.description}</label>
          </div>
          <div className="form-group text-lg p-3 flex-grow">
            <label htmlFor="date">Date: {selectedDate.toDateString()}</label>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                className="mb-4 p mt-3"
                calendarClassName="bg-white rounded-lg border border-gray-300 shadow-md"
                tileClassName={tileClassName}
            />
          </div>
          <div className="form-group text-lg p-3 flex-grow">
            <label htmlFor="startTime">Start Time:</label>
            <input
                type="time"
                value={startTime}
                onChange={handleStartTimeChange}
                className="mb-4 p mt-3"
            />
          </div>
          <div className="form-group text-lg p-3 flex-grow">
            <label htmlFor="endTime">End Time:</label>
            <input
                type="time"
                value={endTime}
                onChange={handleEndTimeChange}
                className="mb-4 p mt-3"
            />
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
