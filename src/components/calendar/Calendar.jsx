import React, { useState } from 'react';
import './calendar.css';
import arrowLeft from '../../asstes/icons/arrowLeft.svg'
import arrowRight from '../../asstes/icons/arrowRight.svg'

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState(new Date().getDate());

    const prevMonth = () => {
        setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
        setCurrentDate(new Date().getDate()); // Reset current date when changing month
    };

    const nextMonth = () => {
        setCurrentMonth(nextMonth => (nextMonth === 11 ? 0 : nextMonth + 1));
        setCurrentYear(nextYear => (currentMonth === 11 ? nextYear + 1 : nextYear));
        setCurrentDate(new Date().getDate()); // Reset current date when changing month
    };


    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const totalDays = daysInMonth(currentMonth, currentYear);
        const startingDay = firstDayOfMonth(currentMonth, currentYear);
        const today = new Date();
        const currentMonthYear = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

        // Dates from previous month
        const previousMonthDays = [];
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const daysInPreviousMonth = daysInMonth(previousMonth, previousMonthYear);
        for (let i = startingDay - 1; i >= 0; i--) {
            previousMonthDays.push({ day: daysInPreviousMonth - i, isCurrentMonth: false });
        }

        // Dates from current month
        const currentMonthDays = Array.from({ length: totalDays }, (_, index) => ({
            day: index + 1,
            isCurrentMonth: true
        }));

        // Dates from next month
        const nextMonthDays = [];
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const remainingDays = 7 - (previousMonthDays.length + currentMonthDays.length) % 7;
        for (let i = 1; i <= remainingDays; i++) {
            nextMonthDays.push({ day: i, isCurrentMonth: false });
        }

        const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

        return allDays.map((day, index) => {
            const classNames = ["day"];
            if (!day.isCurrentMonth) {
                classNames.push("other-month");
            } else if (currentMonthYear && day.day === today.getDate()) {
                classNames.push("current-date");
            }
            return <div key={`day-${index}`} className={classNames.join(" ")}>{day.day}</div>;
        });
    };





    return (
        <div className="calendar">
            <div className="navigation">
                <button onClick={prevMonth}>
                    <img src={arrowLeft} />
                </button>
                <div className="current-month">{`${monthNames[currentMonth]} ${currentYear}`}</div>
                <button onClick={nextMonth}>
                    <img src={arrowRight} />
                </button>
            </div>
            <div className="days-of-week">
                {daysOfWeek.map(day => (
                    <div key={day} className="day-of-week">{day}</div>
                ))}
            </div>
            <div className="dates">
                {renderCalendar()}
            </div>
        </div>
    );
}

export default Calendar;
