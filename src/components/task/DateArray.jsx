// DateArray.jsx
import React, { useState } from 'react';
import './dateArray.css';
import DailyTaskList from './Daily/DailyTaskList';
import TaskCalendar from '../task/TaskCalendar/TaskCalendar';

export default function DateArray() {
    const dates = TaskCalendar();
    const [tasks, setTasks] = useState({});

    const handleTaskAdd = (newTask) => {
        const dateString = newTask.date.toDateString();
        setTasks((prevTasks) => ({
            ...prevTasks,
            [dateString]: [...(prevTasks[dateString] || []), newTask],
        }));
    };

    return (
        <div className="dateArray">
            <DayList days={dates} tasks={tasks} onTaskAdd={handleTaskAdd} />
        </div>
    );
}

function DayList({ days, tasks, onTaskAdd }) {
    return (
        <div className="dayList">
            {days.map((day, index) => (
                <div className="test" key={index}>
                    <DailyTaskList
                        day={day.date.toLocaleDateString(undefined, { weekday: 'long' })}
                        date={day.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                        tasks={tasks[day.date.toDateString()] || []}
                        onTaskAdd={onTaskAdd}
                        key={index}
                    />
                    {/* Rest of the code */}
                </div>
            ))}
        </div>
    );
}