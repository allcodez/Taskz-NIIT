import React, { useState, useRef, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Calendar from '../../calendar/Calendar';
import CategoryOption from '../../categories/CategoryOption';
import 'react-datepicker/dist/react-datepicker.css';
import './addTask.css';

const AddTask = ({ onTaskAdd }) => {
    const [startDate, setStartDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('Uncategorised');
    const [taskTime, setTaskTime] = useState('');
    const [endTime, setEndTime] = useState('');

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
            startTime: taskTime ? `${formatDateString(selectedDate)}T${taskTime}:00` : null,
            endTime: endTime ? `${startDate ? formatDateString(startDate) : formatDateString(selectedDate)}T${endTime}:00` : null,
            taskStatus: "PENDING",
            taskCategory: selectedCategory || "Uncategorised",
            startDate: selectedDate ? formatDateString(selectedDate) : null  // Use selectedDate as startDate
        };

        // Pass selectedDate directly to onTaskAdd
        onTaskAdd(selectedDate, newTask);

        const token = sessionStorage.getItem('token');
        const userId = sessionStorage.getItem('userId');

        if (!token || !userId) {
            console.error('No token or user ID found in session storage');
            alert('You must be logged in to create a task.');
            return;
        }

        try {
            // Use newTask object as the payload
            const payload = { ...newTask };
            console.log('payload', payload);
            const response = await fetch(`https://startaskzbackend-production.up.railway.app/user/create-task/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Add task api resp', data);
                alert('Task created successfully.');
                console.log('Task Created');
            } else {
                const errorData = await response.json();
                console.error('Error creating task:', errorData);
                alert(`Error creating task: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error. Please try again later.');
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
