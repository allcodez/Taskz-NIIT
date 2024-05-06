import React, { useState } from 'react';
import Minitaskitem from './Minitaskitem';
import './dailyList.css';
import Popup from 'reactjs-popup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DailyList({ tasks, dayTitle, totalTime }) {
    const [startDate, setStartDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);

    const handleDateClick = () => {
        setShowCalendar(!showCalendar);
    };

    const handleDateSelect = (date) => {
        setStartDate(date);
        setShowCalendar(false);
        // You can perform any additional actions here based on the selected date
    };

    return (
        <div className="dailyList">
            <h2>{dayTitle}</h2>
            <Popup
                trigger={
                    <div className="add">
                        <p><span>+</span>Add task</p>
                        <div className="time">{totalTime}</div>
                    </div>}
                className='popup'
                closeOnDocumentClick={false}
            >
                {close => (
                    <div className="darkBg" onClick={close}>
                        <div className="centered" onClick={(e) => e.stopPropagation()}>
                            <div className="content">
                                <form action="">
                                    <textarea placeholder='Task description...' name="" id="" cols="55" rows="3"></textarea>
                                    <div className="iconRow">
                                        <div onClick={handleDateClick} className='date'>{startDate ? startDate.toLocaleDateString(undefined, { month: 'long', day: 'numeric' }) : 'Start'}</div>
                                        {showCalendar && (
                                            <DatePicker
                                                selected={startDate}
                                                onChange={date => handleDateSelect(date)}
                                                inline
                                            />
                                        )}
                                        <select name="" id="">
                                            <option value=""></option>
                                        </select>
                                        <select name="" id="">
                                            <option value=""></option>
                                        </select>
                                        <button>+</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
            {tasks.map(task => (
                <Minitaskitem
                    key={task.id}
                    task={task}
                />
            ))}
        </div>
    );
}
