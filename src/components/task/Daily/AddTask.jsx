import React, { useState, useRef, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Calendar from '../../calendar/Calendar';
import CategoryOption from '../../categories/CategoryOption';
import './addTask.css'

const AddTask = ({ onTaskAdd }) => {
    const [startDate, setStartDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Uncategorised');
    const [taskTime, setTaskTime] = useState('');

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
        setStartDate(date);
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const handleCategoryClick = () => {
        setShowCategory(!showCategory);
        setShowCalendar(false);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setShowCategory(false);
    };

    const handleTaskTimeChange = (event) => {
        setTaskTime(event.target.value);
    };

    const handleAddTask = () => {
        const taskName = document.getElementById('taskName').value;
        const newTask = {
            name: taskName,
            time: taskTime,
            date: selectedDate,
            category: selectedCategory
        };

        onTaskAdd(newTask);

        // Schedule notification if task time is set
        if (taskTime && selectedDate) {
            const taskDateTime = new Date(selectedDate);
            const currentTime = new Date();
            const notificationTime = new Date(taskDateTime.getTime() - 5 * 60 * 1000); // 5 minutes before task time

            if (Notification.permission !== 'granted') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        // Permission granted, proceed with showing notifications
                        showNotification("Permission Granted", "You can now receive task notifications.");
                    }
                });
            }

            if (taskDateTime.getTime() <= currentTime.getTime()) {
                // Task time is in the past, show notification immediately
                showNotification("Task Reminder", `Your task "${taskName}" is due now!`);
            } else if (notificationTime.getTime() > currentTime.getTime()) {
                // Task time is more than 5 minutes in the future, schedule notification for 5 minutes before task time
                setTimeout(() => {
                    showNotification("Task Reminder", `Your task "${taskName}" is coming up in 5 minutes!`);
                }, notificationTime.getTime() - currentTime.getTime());
            }
        }
    };

    const showNotification = (title, body) => {
        if (Notification.permission === 'granted') {
            new Notification(title, { body });
        }
    };

    return (
        <Popup
            trigger={
                <div className="add">
                    <p><i className='bx bx-plus'></i> Add task</p>
                    <div className="time">--:--</div>
                </div>}
            className='popup'
            closeOnDocumentClick
        >
            {close => (
                <div className="content add-task">
                    <form action="">
                        <textarea placeholder='Task Name or description...' name="" id="taskName" cols="55" rows="1"></textarea>
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
