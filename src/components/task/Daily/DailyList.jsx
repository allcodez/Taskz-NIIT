// DailyList.jsx
import React from 'react';
import Minitaskitem from '../Modal/TaskModal';
import './dailyList.css';

export default function DailyList({ tasks }) {
    return (
        <div className="dailyList-task">
            {tasks.map((task, index) => (
                <Minitaskitem key={index} task={task} />
            ))}
        </div>
    );
}