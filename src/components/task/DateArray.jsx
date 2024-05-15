import React, { useState, useContext, useEffect, useRef } from 'react';
import './dateArray.css';
import DailyTaskList from './Daily/DailyTaskList';
import TaskCalendar from '../task/TaskCalendar/TaskCalendar';
import { DateContext } from '../../../hooks/DateContext';

export default function DateArray() {
    const dates = TaskCalendar();
    const [tasks, setTasks] = useState({});
    const { selectedDate } = useContext(DateContext);
    const scrollContainerRef = useRef(null);

    const handleTaskAdd = (newTask) => {
        const dateString = newTask.date.toDateString();
        setTasks((prevTasks) => ({
            ...prevTasks,
            [dateString]: [...(prevTasks[dateString] || []), newTask],
        }));
    };

    const handleTaskEdit = (taskId, taskDate, editedTask) => {
        const dateString = taskDate.toDateString();
        setTasks((prevTasks) => ({
            ...prevTasks,
            [dateString]: prevTasks[dateString].map((task) =>
                task.id === taskId ? editedTask : task
            ),
        }));
        // console.log('New task from DateArray.jsx', newTask)
    };

    const handleTaskDelete = (taskId, taskDate) => {
        const dateString = taskDate.toDateString();
        setTasks((prevTasks) => ({
            ...prevTasks,
            [dateString]: prevTasks[dateString].filter((task) => task.id !== taskId),
        }));
    };

    // ... (rest of the code)

    return (
        <div className="dateArray" ref={scrollContainerRef}>
            <DayList
                days={dates}
                tasks={tasks}
                onTaskAdd={handleTaskAdd}
                onTaskEdit={handleTaskEdit}
                onTaskDelete={handleTaskDelete}
            />
        </div>
    );
}

function DayList({ days, tasks, onTaskAdd, onTaskEdit, onTaskDelete }) {
    return (
        <div className="dayList">
            {days.map((day, index) => (
                <div className="test" key={index} data-date={day.date.toISOString()}>
                    <DailyTaskList
                        day={day.date.toLocaleDateString(undefined, { weekday: 'long' })}
                        date={day.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                        tasks={tasks[day.date.toDateString()] || []}
                        onTaskAdd={onTaskAdd}
                        onTaskEdit={onTaskEdit}
                        onTaskDelete={onTaskDelete}
                        key={index}
                    />
                </div>
            ))}
        </div>
    );
}