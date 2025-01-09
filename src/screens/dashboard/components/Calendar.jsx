import React, { useState, useEffect, useRef } from "react";
import dayjs from "dayjs";
import "./Calendar.css";
import { IMAGES } from "../../../theme";

const Calendar = ({ isFull }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [todaysDate, setTodaysDate] = useState(
    isFull ? { date: dayjs()?.date() } : dayjs()
  );
  const [selectedDate, setSelectedDate] = useState(todaysDate);
  const [showFullMonth, setShowFullMonth] = useState(false); // State to toggle full month
  const calendarRef = useRef(null); // Reference to the calendar element

  const startOfWeek = currentDate.startOf("week");
  const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day();
  const emptyDays = Array(firstDayOfMonth == 0 ? 6 : firstDayOfMonth - 1).fill(
    null
  );
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  useEffect(() => {
    setTodaysDate(isFull ? { date: dayjs()?.date() } : dayjs());
  }, [isFull]);

  // Handle date selection
  const handleDateSelect = (day) => {
    setSelectedDate(isFull ? { date: day } : day);
  };

  // Handle week navigation
  const handlePrevWeek = () => {
    if (isFull) setCurrentDate(currentDate.subtract(1, "month"));
    else setCurrentDate(currentDate.subtract(1, "week"));
    setSelectedDate(null);
  };

  const handleNextWeek = () => {
    if (isFull) setCurrentDate(currentDate.add(1, "month"));
    else setCurrentDate(currentDate.add(1, "week"));
    setSelectedDate(null);
  };

  // Handle calendar icon click to show the full month view
  const toggleFullMonth = () => {
    setShowFullMonth(!showFullMonth);
  };

  // Handle clicks outside the calendar to close the full month view
  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowFullMonth(false);
    }
  };

  useEffect(() => {
    if (showFullMonth) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    // Clean up event listener on unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showFullMonth]);

  const getFullMonthDays = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");
    const daysInMonth = [];

    for (
      let day = startOfMonth;
      day.isBefore(endOfMonth);
      day = day.add(1, "day")
    ) {
      daysInMonth.push(day);
    }

    return daysInMonth;
  };

  return (
    <div className="calendar" ref={calendarRef}>
      {/* Calendar with ref */}
      <div className="header">
        <button className="nav-button" onClick={handlePrevWeek}>
          <img src={IMAGES.left} width={"7px"} height={"13px"} />
        </button>
        <div className="month-year" onClick={toggleFullMonth}>
          <img src={IMAGES.calendar} className="calendar-icon" />{" "}
          {/* Calendar Icon */}
          {startOfWeek.format("MMMM YYYY")}
        </div>
        <button className="nav-button" onClick={handleNextWeek}>
          <img src={IMAGES.right} width={"7px"} height={"11px"} />
        </button>
      </div>
      <div className="days-of-week">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-name">
            {day}
          </div>
        ))}
      </div>
      {/* Calendar Week View */}
      <div className="calendar-days">
        {isFull ? (
          <>
            {emptyDays.map((_, index) => (
              <div key={index} className="empty-day"></div>
            ))}
            {daysArray.map((day, index) => {
              const dayOfWeek = currentDate.date(day).day();

              return (
                <div style={{ position: "relative" }}>
                  <div
                    key={day}
                    className={`day ${
                      selectedDate === dayOfWeek ? "selected-column" : ""
                    } ${
                      selectedDate && selectedDate?.date === day
                        ? "selected-date"
                        : ""
                    }`}
                    onClick={() => handleDateSelect(day)}
                  >
                    {day}
                  </div>
                  <div className="event-dots">
                    {index === 2 ? (
                      <>
                        <div className="dot black-dot"></div>
                        <div className="dot"></div>
                      </>
                    ) : index === 4 || index === 16 || index === 18 ? (
                      <div className="dot"></div>
                    ) : null}
                  </div>
                  {selectedDate && selectedDate?.date === day && (
                    <div
                      className="bgEvent"
                      style={{
                        height: `${
                          (parseInt(
                            (selectedDate?.date +
                              (firstDayOfMonth ? firstDayOfMonth - 2 : 5)) /
                              7
                          ) +
                            3) *
                            36.2 -
                          50.5
                        }px`,
                        top: `-${
                          (parseInt(
                            (selectedDate?.date +
                              (firstDayOfMonth ? firstDayOfMonth - 2 : 5)) /
                              7
                          ) +
                            1) *
                            36.2 -
                          5
                        }px`,
                      }}
                    ></div>
                  )}
                  {/* {selectedDate && selectedDate?.date === day && <div className="bgEvent" style={{height: `${(parseInt(selectedDate?.date/7) + 3)*36.2 - 50}px`, top: `-${(parseInt(selectedDate?.date/7) + 1) * 36 - 5}px`}}></div>} */}
                </div>
              );
            })}
          </>
        ) : (
          daysOfWeek.map((_, index) => {
            const day = startOfWeek.add(index + 1, "day");
            return (
              <div style={{ position: "relative" }} key={index}>
                <div
                  className={`day ${
                    selectedDate && selectedDate.isSame(day, "day")
                      ? "selected-date"
                      : ""
                  }`}
                  style={{ marginBottom: "8px" }}
                  onClick={() => handleDateSelect(day)}
                >
                  {day.date()}
                  <div className="event-dots" style={{ bottom: "5px" }}>
                    {index === 2 ? (
                      <>
                        <div className="dot black-dot"></div>
                        <div className="dot"></div>
                      </>
                    ) : index === 4 ? (
                      <div className="dot"></div>
                    ) : null}
                  </div>
                </div>
                {selectedDate && selectedDate.isSame(day, "day") && (
                  <div className="bgEvent"></div>
                )}
              </div>
            );
          })
        )}
      </div>
      {/* Full Month View */}
      {showFullMonth && !isFull && (
        <div
          className="full-month-calendar"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            background: "none",
            boxShadow: "none",
            padding: "23px 0",
          }}
        >
          <Calendar isFull={true} />
        </div>
      )}
    </div>
  );
};

export default Calendar;
