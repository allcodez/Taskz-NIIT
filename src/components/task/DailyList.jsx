// DailyList.jsx
import React from 'react';
import Minitaskitem from './Minitaskitem';

export default function DailyList({ tasks, dayTitle  }) {
    return (
        <div className="dailyList">
            <h2>{dayTitle}</h2>
            {tasks.map(task => (
                <Minitaskitem
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
}
