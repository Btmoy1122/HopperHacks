import React from "react";
import "./App.css";

// Define the Calendar component directly in this file
const Calendar = () => {
  return <div>This is the calendar component.</div>;
};

function CalendarPage() {
  return (
    <div className="App">
      <h1>Welcome!</h1>
      <Calendar /> {/* Use the Calendar component */}
    </div>
  );
}

export default CalendarPage; // Export CalendarPage