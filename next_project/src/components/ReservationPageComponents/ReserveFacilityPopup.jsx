import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function ReserveFacilityPopup({ facility, onReservationSubmit, onCancel }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reservationDetails, setReservationDetails] = useState({
    date: selectedDate,
    description: facility.description,
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setReservationDetails({ ...reservationDetails, date: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onReservationSubmit(reservationDetails);
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
          <label htmlFor="description">
            Description: {facility.description}
          </label>
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
