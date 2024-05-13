// DailyTaskList.jsx
import React from 'react';
import DailyList from './DailyList';
import './dailyList.css';
import AddTask from './AddTask';

export default function DailyTaskList({ day, date, tasks, onTaskAdd }) {
    return (
        <div className="dailyTaskList">
            <div className="dailyTaskList-date">
                <h2>{day}</h2>
                <p className="dailyList-date">{date}</p>
            </div>
            <AddTask onTaskAdd={onTaskAdd} />
            <DailyList tasks={tasks} />
        </div>
    );
}