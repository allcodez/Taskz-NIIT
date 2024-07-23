import React from 'react';
import TaskModal from '../Modal/TaskModal';
import './dailyList.css';

export default function DailyList({ tasks, onTaskEdit, onTaskDelete, onTaskUpdate }) {
    return (
        <div className="dailyList-task">
            {tasks.map((task, index) => (
                <TaskModal
                    key={`${task.id}-${index}`} // Unique key combining task.id and index
                    task={{ ...task }}
                    onTaskEdit={onTaskEdit}
                    onTaskDelete={onTaskDelete}
                    onTaskUpdate={onTaskUpdate}
                />
            ))}
        </div>
    );
}