import React, { createContext, useState, useEffect } from 'react';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState({});

    useEffect(() => {
        fetchTaskData();
    }, []);

    const fetchTaskData = async () => {
        const tasks = await fetchTasks();
        if (tasks) {
            const tasksByDate = tasks.reduce((acc, task) => {

                const startedAt = new Date(task.startedAt);
                        
                // Extract just the date part and create a new startDate
                const startDate = new Date(startedAt.getFullYear(), startedAt.getMonth(), startedAt.getDate());
                const dateString = startDate.toDateString()

                // const dateString = new Date(task.startDate).toDateString();
                if (!acc[dateString]) {
                    acc[dateString] = [];
                }
                acc[dateString].push(task);
                return acc;
            }, {});
            setTasks(tasksByDate);
        }
    };

    const fetchTasks = async () => {
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            console.error('User ID or token not found in session storage');
            return;
        }

        try {
            const response = await fetch(`https://star-taskz-backend.onrender.com/star-taskz/api/task/all/${userId}`, {
                method: 'GET',
                headers: {
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

    const updateTask = (updatedTask) => {
        setTasks((prevTasks) => {
            const taskDate = new Date(updatedTask.startDate).toDateString();
            return {
                ...prevTasks,
                [taskDate]: prevTasks[taskDate] ? prevTasks[taskDate].map((task) =>
                    task.id === updatedTask.id ? updatedTask : task
                ) : [updatedTask],
            };
        });
    };

    return (
        <TaskContext.Provider value={{ tasks, setTasks, fetchTaskData, fetchTasks, updateTask }}>
            {children}
        </TaskContext.Provider>
    );
};
