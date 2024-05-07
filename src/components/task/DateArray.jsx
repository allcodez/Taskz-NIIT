// DateArray.jsx
import React from 'react';
import './dateArray.css';
import DailyTaskList from './Daily/DailyTaskList';
import Calendar from '../calendar/Calendar'; // Import Calendar

export default function DateArray() {
    const dates = Calendar(); // Call Calendar function to get dates
    
    return (
        <div className="dateArray">
            <DayList days={dates} />
        </div>
    );
}

function DayList({ days }) {
    return (
        <div className="dayList">
            {days.map((day, index) => (
                <div key={index}>
                    <p>{day.date.toLocaleDateString()} - {day.day}</p> {/* Render date as a string */}
                    <DailyTaskList day={day} />
                </div>
            ))}
        </div>
    );
}
