// DailyTaskList.jsx
import React from 'react';
import DailyList from './DailyList';
import './dailyList.css';
import AddTask from './AddTask';
import ProgressBar from '../../progressBar/ProgressBar'; // Import the ProgressBar component

export default function DailyTaskList({ day, date, tasks, onTaskAdd, onTaskEdit, onTaskDelete }) {
    // Calculate overall progress for the day
    const calculateOverallProgress = () => {
        if (tasks.length === 0) return 0;

        const completedTasks = tasks.filter(task => task.completed);
        return (completedTasks.length / tasks.length) * 100;
    };

    const progress = calculateOverallProgress();

    return (
        <div className="dailyTaskList">
            <div className="dailyTaskList-date">
                <h2>{day}</h2>
                <p className="dailyList-date">{date}</p>
            </div>
            {/* Conditionally render the ProgressBar component */}
            <ProgressBar progress={progress} className={tasks.length > 0 ? 'visible' : 'hidden'} />
            <AddTask onTaskAdd={onTaskAdd} />
            <DailyList tasks={tasks} onTaskEdit={onTaskEdit} onTaskDelete={onTaskDelete} />
        </div>
    );
}
