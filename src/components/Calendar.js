import React, { useState, useEffect } from "react";
import "../styles/form.css";

const Calendar = ({ selectedDate, setSelectedDate }) => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDate = today.getDate();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const days = new Date(selectedYear, selectedMonth + 1, 0).getDate();
    setDaysInMonth([...Array(days).keys()].map((day) => day + 1));
  }, [selectedYear, selectedMonth]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 2 }, (_, i) => currentYear + i);

  const handleMonthChange = (event) => {
    const newMonth = parseInt(event.target.value);
    setSelectedMonth(newMonth);
    setSelectedDate(null);
  };

  const handleYearChange = (event) => {
    const newYear = parseInt(event.target.value);
    setSelectedYear(newYear);
    if (newYear === currentYear && selectedMonth < currentMonth) {
      setSelectedMonth(currentMonth);
    }
    setSelectedDate(null);
  };

  // Improved date formatting to ensure consistent date strings
  const formatDate = (year, month, day) => {
    // Ensure month and day are properly formatted with leading zeros if needed
    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    return `${year}-${formattedMonth}-${formattedDay}`;
  };

  const handleDateClick = (day) => {
    const isPastDate =
      selectedYear === currentYear &&
      selectedMonth === currentMonth &&
      day < currentDate;

    if (!isPastDate) {
      // Use proper date formatting for consistency
      const formattedDate = formatDate(selectedYear, selectedMonth + 1, day);
      
      if (setSelectedDate) {
        setSelectedDate(formattedDate);
      } else {
        console.error("setSelectedDate is not defined!");
      }
    }
  };

  return (
    <div 
      className="calendar" 
      aria-label="Calendar" 
      role="grid"
      aria-labelledby="calendar-heading"
    >
      <h3 id="calendar-heading">Select a date</h3>

      {/* Year and Month selection */}
      <div className="calendar-controls">
        <div>
          <label htmlFor="yearSelect">Year</label>
          <select 
            id="yearSelect" 
            value={selectedYear} 
            onChange={handleYearChange} 
            aria-label="Select year"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="monthSelect">Month</label>
          <select 
            id="monthSelect" 
            value={selectedMonth} 
            onChange={handleMonthChange} 
            aria-label="Select month"
          >
            {months.map((month, index) => (
              <option 
                key={month} 
                value={index} 
                disabled={selectedYear === currentYear && index < currentMonth}
              > 
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Weekday headers for better calendar structure */}
      <div className="weekday-headers" role="row">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <span key={day} className="weekday-header" role="columnheader">
            {day}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="calendar-grid" role="rowgroup">
        {/* Added proper spacing for first day of month */}
        {(() => {
          // Get the first day of the month (0 = Sunday, 1 = Monday, etc.)
          const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();
          
          // Create empty placeholder cells for proper alignment
          const placeholders = Array(firstDayOfMonth).fill(null).map((_, index) => (
            <div key={`placeholder-${index}`} className="calendar-placeholder"></div>
          ));
          
          // Return the placeholders
          return placeholders;
        })()}
        
        {daysInMonth.map((day) => {
          const isPastDate =
            selectedYear === currentYear &&
            selectedMonth === currentMonth &&
            day < currentDate;
          
          // Use proper date formatting for consistency
          const dateStr = formatDate(selectedYear, selectedMonth + 1, day);
          
          // Better aria labeling for dates
          const ariaLabel = `${months[selectedMonth]} ${day}, ${selectedYear}`;

          return (
            <button
              key={day}
              type="button"
              className={`calendar-day ${selectedDate === dateStr ? "selected" : ""} ${isPastDate ? "past-date" : ""}`}
              onClick={() => handleDateClick(day)}
              disabled={isPastDate}
              role="gridcell"
              aria-selected={selectedDate === dateStr}
              aria-label={ariaLabel}
              aria-disabled={isPastDate}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;