import React from 'react';
import './minitaskitem.css';
import { GrStatusGood } from "react-icons/gr";
import { CiCalendarDate, CiClock2 } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import Popup from 'reactjs-popup';

export default function Minitaskitem({ taskTitle, time, category }) {
  return (
    <Popup
      trigger={(
        <div className='container'>
          <div className="title">
            <p>{taskTitle}Wash the school</p>
            <div className='time'>{time}10:00</div>
          </div>
          <div>
            <div className="lowerCont">
              <div className="iconsCont">
                <GrStatusGood className='tick-icon' />
                <CiCalendarDate className='calender-icon none'/>
                <CiClock2 className='timer-icon none' />
              </div> 
              <div className="category">
                <p><span className='ash'>#</span>{category}Work</p>
              </div>
            </div>
          </div>
        </div>
      )}
      position="right center"
      modal
      nested
      closeOnDocumentClick
    >
      {close => (
        <div className='darkBg'>
          <div className="centered">
            <div className="close-icon" onClick={close}>
              <MdClose />
            </div>
            <p>Popup content here !!</p>
          </div>
        </div>
      )}
    </Popup>
  );
}
