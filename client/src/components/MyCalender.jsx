// MyCalendar.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Optional: for default styling

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Calendar
        onChange={handleDateChange}
        value={date}
        className="border border-gray-300 rounded-lg shadow-sm"
      />
      <div className="mt-4 text-center">
        <p className="text-lg font-medium">Selected Date:</p>
        <p className="text-gray-700">{date.toDateString()}</p>
      </div>
    </div>
  );
};

export default MyCalendar;
