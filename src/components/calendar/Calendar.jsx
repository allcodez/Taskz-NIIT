import React, { useState, useEffect, useRef, useContext } from 'react';
import './calendar.css';
import { DateContext } from '../../../hooks/DateContext';
import { TaskContext } from '../../../hooks/TaskContext';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar({ onDateSelect }) {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const { tasks } = useContext(TaskContext);

    const prevMonth = () => {
        setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
    };

    const nextMonth = () => {
        setCurrentMonth(nextMonth => (nextMonth === 11 ? 0 : nextMonth + 1));
        setCurrentYear(nextYear => (currentMonth === 11 ? nextYear + 1 : nextYear));
    };

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        onDateSelect(date);
    };

    const renderCalendar = () => {
        const totalDays = daysInMonth(currentMonth, currentYear);
        const startingDay = firstDayOfMonth(currentMonth, currentYear);
        const today = new Date();
        const currentMonthYear = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

        const calendarDays = [];

        // Previous month's days
        const prevMonthDays = daysInMonth((currentMonth - 1 + 12) % 12, currentYear);
        for (let i = startingDay - 1; i >= 0; i--) {
            const date = new Date(currentYear, currentMonth - 1, prevMonthDays - i);
            calendarDays.push(
                <div
                    key={`prev-${i}`}
                    className="day other-month"
                    onClick={() => handleDateSelect(date)}
                >
                    {prevMonthDays - i}
                </div>
            );
        }

        // Current month's days
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(currentYear, currentMonth, day);
            const dateString = date.toDateString();
            const isToday = currentMonthYear && day === today.getDate();
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const hasTasks = tasks[dateString] && tasks[dateString].length > 0;

            const classNames = ["day"];
            if (isToday) classNames.push("current-date");
            if (isSelected && !isToday) classNames.push("selected-date");

            calendarDays.push(
                <div
                    key={`current-${day}`}
                    className={classNames.join(" ")}
                    onClick={() => handleDateSelect(date)}
                >
                    {day}
                    {hasTasks && <div className="task-dot"></div>}
                </div>
            );
        }

        // Next month's days
        const remainingDays = 42 - calendarDays.length; // 6 rows * 7 days = 42
        for (let i = 1; i <= remainingDays; i++) {
            const date = new Date(currentYear, currentMonth + 1, i);
            calendarDays.push(
                <div
                    key={`next-${i}`}
                    className="day other-month"
                    onClick={() => handleDateSelect(date)}
                >
                    {i}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div className="calendar">
            <div className="navigation">
                <div className='nav-arrow' onClick={prevMonth}>
                    <i className='bx bx-chevron-left'></i>
                </div>
                <div className="current-month">{`${monthNames[currentMonth]} ${currentYear}`}</div>
                <div className='nav-arrow' onClick={nextMonth}>
                    <i className='bx bx-chevron-right'></i>
                </div>
            </div>
            <div className="days-of-week">
                {daysOfWeek.map((day, index) => (
                    <div key={`day-${index}`} className="day-of-week">
                        {day}
                    </div>
                ))}
            </div>
            <div className="dates">
                {renderCalendar()}
            </div>
        </div>
    );
}