import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        const fetchTaskData = async () => {
            const tasks = await fetchTasks();
            if (tasks) {
                const tasksByDate = tasks.reduce((acc, task) => {
                    const dateString = new Date(task.startDate).toDateString();
                    if (!acc[dateString]) {
                        acc[dateString] = [];
                    }
                    acc[dateString].push(task);
                    return acc;
                }, {});
                setTasks(tasksByDate);
            }
        };

        fetchTaskData();
    }, []);

    const fetchTasks = async () => {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token');

        if (!userId || !token) {
            console.error('User ID or token not found in session storage');
            return;
        }

        try {
            const response = await fetch(`https://star-taskz-backend.onrender.com/star-taskz/api/task/all/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const tasks = await response.json();
                console.log('Tasks retrieved successfully:', tasks);
                return tasks;
            } else {
                const errorData = await response.json();
                console.error('Error fetching tasks:', errorData);
                return null;
            }
        } catch (error) {
            console.error('Network error:', error);
            return null;
        }
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, fetchTasks }}>
            {children}
        </TaskContext.Provider>
    );
};