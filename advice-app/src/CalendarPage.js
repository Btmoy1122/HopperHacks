import React from "react";
import MyCalendar from "./MyCalendar"; // ✅ Updated import
import "./CalendarPage.css";

function CalendarPage() {
    return (
      <div className="App">
        <h1>Welcome!</h1>
        <MyCalendar />
      </div>
      
    );
  }

export default CalendarPage;
