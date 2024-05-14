import React, { useState } from 'react';
import Popup from 'reactjs-popup';

import Minitaskitem from '../Modal/TaskModal';
import { FaRegClock } from "react-icons/fa6";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// import { Button, Form, Input } from 'antd';
// import { PlusOutlined } from '@ant-design/icons';

const AddTask = ({ tasks, dayTitle, totalTime }) => {

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
        <Popup
            trigger={
                <div className="add">
                    <p><span>+</span>Add task</p>
                    <div className="time">{totalTime}--:--</div>
                </div>}
            className='popup'
            closeOnDocumentClick={false}
        >
            {close => (
                // <div className="darkBag" onClick={close}>
                // <div className="center" onClick={(e) => e.stopPropagation()}>
                <div className="content">
                    <form action="">
                        <textarea placeholder='Task description...' name="" id="" cols="55" rows="3"></textarea>
                        <div className="iconRow">
                            <div onClick={handleDateClick} className='date'> Start:{startDate ? startDate.toLocaleDateString(undefined, { text: 'Start:', month: 'long', day: 'numeric' }) : ''}</div>
                            {showCalendar && (
                                <DatePicker
                                    className='absolute'
                                    selected={startDate}
                                    onChange={date => handleDateSelect(date)}
                                    inline
                                />
                            )}
                            <div className="rightIcons">
                                <select name="" id="">
                                    <FaRegClock />
                                    <option value="0" disabled>--:--</option>
                                </select>
                                <select name="" id="">
                                    <option value=""></option>
                                </select>
                                <button>+</button>
                            </div>
                        </div>
                    </form>
                </div>
                // </div>
                // </div>
            )}
        </Popup>
    );
};

export default AddTask;


