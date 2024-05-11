import React, { useState } from 'react';
import Minitaskitem from '../Modal/TaskModal';
import './dailyList.css';
import Popup from 'reactjs-popup';
import { FaRegClock } from "react-icons/fa6";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DailyList({ tasks, dayTitle, totalTime }) {

    return (
        <div className="dailyList">
            {/* <h2>{dayTitle}</h2> */}
            <Popup
                trigger={
                    <div className="add">
                        <p><span>+</span>Add task</p>
                        <div className="time">{totalTime}--:--</div>
                    </div>}
                className='popup'
                closeOnDocumentClick
            >
                
                    {/* <div className="darkBag" onClick={close}> */}
                        {/* <div className="center" onClick={(e) => e.stopPropagation()}> */}
                            <div className="content">
                                <form action="">
                                    <textarea placeholder='Task description...' name="" id="" cols="55" rows="3"></textarea>
                                    <div className="iconRow">
                                        <div className='date'> 
                                        <label id='absolute'>Start:</label>
                                        {/* {startDate ? startDate.toLocaleDateString(undefined, { text: 'Start:', month: 'long', day: 'numeric' }) : ''} */}
                                        {/* </div>
                                        {showCalendar && (
                                            <DatePicker
                                                id='absolute'
                                                selected={startDate}
                                                onChange={date => handleDateSelect(date)}
                                                inline */}
                                            {/* /> */}
                                        {/* )} */}
                                        </div>
                                        <div className="rightIcons">
                                            <div className="select">
                                                <FaRegClock  className='clockII'/>
                                            <select name="" id="">
											<option value="0" >--:--</option>
											<option value="1">5 min</option>
											<option value="2">10 min</option>
											<option value="3">15 min</option>
											<option value="4">20 min</option>
											<option value="5">25 min</option>
											<option value="6">30 min</option>
											<option value="7">45 min</option>
											<option value="8">1 hr</option>
											<option value="9">1.5 hr</option>
											<option value="10">2 hr</option>
											<option value="11">2.5 hr</option>
											<option value="12">3 hr</option>
											<option value="13">4 hr</option>
											<option value="14">5 hr</option>
											<option value="15">6 hr</option>
											<option value="16">7 hr</option>
											<option value="17">8 hr</option>
                                            </select>
                                            </div>
                                            <div className="select">
                                                    <p className='hash'>#</p>
                                                <select name="" id="" className='selectII'>
                                                    <option value="1">Work</option>
                                                    <option value="2">Personal</option>
                                                    <option value="3">Study</option>
                                                </select>
                                                <button className="addButton">+ Add</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        {/* </div> */}
                    {/* </div> */}
                
            </Popup>
            <div className='dailyList-task'>
                {tasks.map(task => (
                    <Minitaskitem
                        key={task.id} // Ensure each component has a unique key
                        task={task}
                    />
                ))}
            </div>
        </div>
    );
}
