import React from "react";
import "./App.css";
import Calendar from './Calendar'; // Import the Calendar component

function CalendarPage() {
  return (
    <div className="App">
      <h1>Welcome!</h1>
      <Calendar /> {/* Use the Calendar component */}
    </div>
  );
}

export default CalendarPage; // Export CalendarPage