import React, { useState, useRef, useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import Calendar from '../../calendar/Calendar';
import CategoryOption from '../../categories/CategoryOption';
import 'react-datepicker/dist/react-datepicker.css';
import './addTask.css';
import { TaskContext } from '../../../../hooks/TaskContext';

const AddTask = ({ onTaskAdd }) => {
    const [startDate, setStartDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Uncategorised');
    const [taskTime, setTaskTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const { setTasks, fetchTasks } = useContext(TaskContext);

    const calendarRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (calendarRef.current && !calendarRef.current.contains(event.target)) {
            setShowCalendar(false);
        }
    };

    const handleDateClick = () => {
        setShowCalendar(!showCalendar);
        setShowCategory(false);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        console.log("Date selected:", date); // Debugging log
        setShowCalendar(false);
    };

    const handleCategoryClick = () => {
        setShowCategory(!showCategory);
        setShowCalendar(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowCategory(false);
        setSelectedCategory(category);
        setShowCategory(false);
    };

    const handleTaskTimeChange = (event) => {
        setTaskTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    const handleAddTask = async () => {
        const taskName = document.getElementById('taskName').value;

        const formatDateString = (date) => {
            if (!date) return null;
            const offset = date.getTimezoneOffset();
            const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
            return adjustedDate.toISOString().split('T')[0];
        };

        const newTask = {
            taskName: taskName || null,
            taskDescription: taskName || null,
            startedAt: taskTime ? `${formatDateString(selectedDate)}T${taskTime}:00` : null,
            endedAt: endTime ? `${startDate ? formatDateString(startDate) : formatDateString(selectedDate)}T${endTime}:00` : null,
            status: "pending",
            taskCategory: selectedCategory || "Uncategorised",
            startDate: selectedDate ? formatDateString(selectedDate) : null  // Use selectedDate as startDate
        };

        // Pass selectedDate directly to onTaskAdd


        // const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        if (!userId) {
            console.error('No token or user ID found in session storage');
            // alert('You must be logged in to create a task.');
            return;
        }

        try {
            // Use newTask object as the payload
            const payload = { ...newTask };
            console.log('payload', payload);
            const response = await fetch(`https://star-taskz-backend.onrender.com/star-taskz/api/task/add/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Add task api resp', data);
                // alert('Task created successfully.');
                console.log('Task Created');

                // Fetch the updated tasks after successful task creation
                const tasks = await fetchTasks();
                if (tasks) {
                    const tasksByDate = tasks.reduce((acc, task) => {
                        // const dateString = new Date(task.startDate).toDateString();
                        
                        const startedAt = new Date(task.startedAt);
                        
                        // Extract just the date part and create a new startDate
                        const startDate = new Date(startedAt.getFullYear(), startedAt.getMonth(), startedAt.getDate());
                        const dateString = startDate.toDateString()
                        if (!acc[dateString]) {
                            acc[dateString] = [];
                        }
                        acc[dateString].push(task);
                        return acc;
                    }, {});
                    setTasks(tasksByDate);
                }
            } else {
                // ... (existing error handling code)
            }
        } catch (error) {
            console.error('Error creating task:', error);
            // alert('Failed to create task. Please try again.');
        }
    };

    return (
        <Popup
            trigger={
                <div className="add">
                    <p><i className='bx bx-plus'></i> Add task</p>

                    <div className="time">--:--</div>
                </div>
            }
            className='popup'
            closeOnDocumentClick
        >
            {close => (
                <div className="content add-task">
                    <form action="">
                        <textarea placeholder='Task Name or description...' id="taskName" cols="55" rows="1"></textarea>
                        <div className="iconRow">
                            <div>
                                <div onClick={handleDateClick} className='add-task-date add-hover'>
                                    <i className='bx bx-calendar-plus'></i> {selectedDate ? selectedDate.toLocaleString('default', { weekday: 'long' }) + ', ' + selectedDate.toLocaleString('default', { month: 'long' }) + ' ' + selectedDate.getDate() : 'Start'}
                                </div>
                                {showCalendar &&
                                    <div className='calendar-container' ref={calendarRef}>
                                        <Calendar onDateSelect={handleDateSelect} />
                                    </div>
                                }
                            </div>
                            <div className="rightIcons">
                                <div className="select add-hover">
                                    <input 
                                        type="time" 
                                        value={taskTime} 
                                        onChange={handleTaskTimeChange} 
                                    />
                                </div>
                                <div>
                                    <div onClick={handleCategoryClick} className='add-task-date add-hover'>
                                        # {selectedCategory}
                                    </div>
                                    {showCategory &&
                                        <div className='category-container'>
                                            <CategoryOption handleChange={handleCategorySelect} />
                                        </div>
                                    }
                                </div>
                                <div className='addButton' onClick={() => { handleAddTask(); close(); }}>+ Add</div>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </Popup>
    );
};

export default AddTask;
