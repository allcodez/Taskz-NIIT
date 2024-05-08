// DateArray.jsx
import React from 'react';
import './dateArray.css';
import DailyTaskList from './Daily/DailyTaskList';
import TaskCalendar from '../task/TaskCalendar/TaskCalendar'; // Import Calendar

export default function DateArray() {
    const dates = TaskCalendar(); // Call Calendar function to get dates

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
                    <DailyTaskList
                        day={day.date.toLocaleDateString(undefined, { weekday: 'long' })}
                        date={day.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                    />
                    {/* <p>
                        {day.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} -{' '}
                        {day.date.toLocaleDateString(undefined, { weekday: 'long' })}
                    </p> */}
                    {/* Render date as a string */}
                    
                </div>
            ))}
        </div>
    );
}
