import React from 'react';
import './minitaskitem.css';
import { GrStatusGood } from "react-icons/gr";
import { CiCalendarDate, CiClock2, CiPlay1 } from "react-icons/ci";
import { MdClose, MdDeleteForever } from "react-icons/md";
import Popup from 'reactjs-popup';
import Calendar from '../calendar/Calendar';

export default function Minitaskitem({ task }) {

  return (
    <Popup
      trigger={(
        <div className='container'>
          <div className="title">
            <p>{task.taskTitle}</p>
            <div className='time'>{task.time}</div>
          </div>
          <div>
            <div className="lowerCont">
              <div className="iconsCont">
                <GrStatusGood className='tick-icon' />
                <CiCalendarDate className='calender-icon none'/>
                <CiClock2 className='timer-icon none' />
              </div> 
              <div className="category">
                <p><span className='ash'>#</span>{task.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      modal
      nested
      closeOnDocumentClick
    >
      {close => (
        <div className='darkBg' onClick={close}>
          <div className="centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal">
              <div className="icon-row">
                <div className="categ">
                  <span className='ash'>#</span>
                  <p>{task.category}</p>
                </div>
                <div className="options">
                  <div className='calendar'>
                    <Popup 
                    trigger={
                    <p className='start' onClick={close}>Start: May 4</p>}
                    closeOnDocumentClick >
                      {close => (   
                        <div className="Content">
                         <Calendar className="calendarDate"/>
                        </div>
                      )}
                    </Popup>
                  </div>
                  <div className='due'>
                    <Popup 
                    trigger={
                    <p onClick={close} className='due'>Due</p>}
                    closeOnDocumentClick >
                      {close => (   
                        <div className="Content">
                         <Calendar className="dueDate"/>
                        </div>
                      )}
                    </Popup>
                  </div>
                  <p className='delete' >Delete task <MdDeleteForever /></p>
                  <MdClose onClick={close} className='closer'/>
                </div>
              </div>
              <div className="taskArea">
                <div className="planRow">
                  <div className="taskInfo">
                  <GrStatusGood />
                  {task.taskTitle}
                  </div>
                  <div className="taskDurations">
                    <CiPlay1 />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}
