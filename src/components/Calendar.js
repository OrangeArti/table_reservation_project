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

  const handleDateClick = (day) => {
    const isPastDate =
      selectedYear === currentYear &&
      selectedMonth === currentMonth &&
      day < currentDate;

    if (!isPastDate) {
      const formattedDate = `${selectedYear}-${selectedMonth + 1}-${day}`;
      console.log("User selected date:", formattedDate);
      setSelectedDate(formattedDate);
      if (setSelectedDate) {
        setSelectedDate(formattedDate);
      } else {
        console.error("setSelectedDate is not defined!");
      }
    }
  };

  return (
    <div className="calendar" aria-label="Calendar" role="grid">
      <h2>Select a date</h2>

      {/* Year and Month selection */}
      <div className="calendar-controls">
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

      {/* Calendar grid */}
      <div className="calendar-grid" role="rowgroup">
        {daysInMonth.map((day) => {
          const isPastDate =
            selectedYear === currentYear &&
            selectedMonth === currentMonth &&
            day < currentDate;
                        
          const dateStr = `${selectedYear}-${selectedMonth + 1}-${day}`;

          return (
            <button
              key={day}
              type="button"
              className={`calendar-day ${selectedDate === dateStr ? "selected" : ""}`}
              onClick={() => handleDateClick(day)}
              disabled={isPastDate}
              role="gridcell"
              aria-selected={selectedDate === dateStr}
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