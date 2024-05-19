import React, { useState, useRef, useEffect } from 'react';
import Popup from 'reactjs-popup';
import Calendar from '../../calendar/Calendar';
import CategoryOption from '../../categories/CategoryOption';
import { v4 as uuidv4 } from 'uuid';

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
        // Gather task details
        const taskName = document.getElementById('taskName').value;

        // Generate a unique ID
        const taskId = uuidv4();

        // Create a new task object with gathered details and unique ID
        const newTask = {
            id: taskId, // Add the unique ID
            name: taskName,
            time: taskTime,
            date: selectedDate,
            category: selectedCategory,
            // Add more details as needed
        };

        // Pass the new task to the parent component
        onTaskAdd(newTask);

        // Reset form fields if needed
        document.getElementById('taskName').value = '';
        setTaskTime('');
        setSelectedDate(null);
        setSelectedCategory('Uncategorised');

        console.log('New task from Addtask.jsx', newTask)

        // Close the popup
        close();
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
