import React, { useState } from 'react';
import Minitaskitem from '../Modal/TaskModal';
import './dailyList.css';
import Popup from 'reactjs-popup';
import { FaRegClock } from "react-icons/fa6";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DailyList({ tasks, dayTitle, totalTime }) {

    return (
        <div className='dailyList-task'>
            {tasks.map(task => (
                <Minitaskitem
                    key={task.id} // Ensure each component has a unique key
                    task={task}
                />
            ))}
        </div>
    );
}
