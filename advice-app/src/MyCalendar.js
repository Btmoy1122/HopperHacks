import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css"; // Ensure the CSS path is correct

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [reservations, setReservations] = useState([]);
  const [reservedSlots, setReservedSlots] = useState({}); // Track reserved slots by date

  // Function to disable past dates and weekends
  const isWeekday = (date) => {
    const day = date.getDay();
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison
    return date < today || day === 0 || day === 6; // Disable past dates and weekends
  };

  // Available time slots (9 AM to 5 PM)
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  // Function to check if a time slot is in the past
  const isTimeInPast = (selectedDate, selectedTime) => {
    const now = new Date();
    const [hour, minute] = selectedTime.split(/:| /);
    const reservationTime = new Date(selectedDate);
    reservationTime.setHours(
      selectedTime.includes("PM") && hour !== "12" ? parseInt(hour) + 12 : parseInt(hour),
      parseInt(minute),
      0,
      0
    );
    return reservationTime < now;
  };

  // Function to handle reservation
  const handleReservation = () => {
    if (!date || !time) {
      alert("Please select a date and time.");
      return;
    }

    const dateKey = date.toDateString();

    // Check if the selected time is in the past
    if (isTimeInPast(date, time)) {
      alert("You cannot reserve a time that has already passed.");
      return;
    }

    // Check if the time slot is already reserved for the selected date
    if (reservedSlots[dateKey] && reservedSlots[dateKey].includes(time)) {
      alert("This time slot is already reserved. Please choose another time.");
      return;
    }

    const newReservation = {
      date: dateKey,
      time: time,
    };

    // Update reservations
    setReservations([...reservations, newReservation]);

    // Update reserved slots
    setReservedSlots((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), time],
    }));

    setTime(""); // Reset time selection
  };

  // Filter available time slots
  const availableTimeSlots = timeSlots.filter(
    (slot) =>
      !reservedSlots[date.toDateString()]?.includes(slot) &&
      !isTimeInPast(date, slot)
  );

  return (
    <div className="App">
      <h1>Schedule an Appointment</h1>
      <div className="calendar-container">
        <Calendar
          onChange={setDate}
          value={date}
          tileDisabled={({ date }) => (date ? isWeekday(date) : false)} // Handle null safely
        />
        <p>
          You picked: <strong>{date.toDateString()}</strong>
        </p>
        <div>
          <h3>Select a Time</h3>
          <select value={time} onChange={(e) => setTime(e.target.value)}>
            <option value="">Select a time</option>
            {availableTimeSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleReservation}>Reserve Appointment</button>
      </div>

      <div className="reservations">
        <h3>Your Reservations</h3>
        {reservations.length === 0 ? (
          <p>No reservations yet.</p>
        ) : (
          <ul>
            {reservations.map((reservation, index) => (
              <li key={index}>
                {reservation.date} at {reservation.time}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default MyCalendar;
