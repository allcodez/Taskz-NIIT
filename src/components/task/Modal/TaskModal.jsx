import React, { useState } from 'react';
import './taskModal.css';
import { GrStatusGood } from "react-icons/gr";
import { CiCalendarDate, CiClock2, CiPlay1 } from "react-icons/ci";
import { MdClose, MdDeleteForever } from "react-icons/md";
import Popup from 'reactjs-popup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskModal({ task }) {
	const [selectedDate, setSelectedDate] = useState(null);

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
								<CiCalendarDate className='calender-icon none' />
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
						<div className="modalI">
							<div className="icon-line">
								<div className="categoryI">
									<span className='ash'>#</span>
									<p>{task.category}</p>
								</div>
								<div className="option">
									<div className='calendar'>
										<p className='start'>Start:</p>
										<DatePicker
											selected={selectedDate}
											onChange={date => setSelectedDate(date)}
											dateFormat="MMMM d"
											placeholderText="Select a date"
											className='date'
											showPopperArrow={false}
										/>
									</div>
									<div className='due'>
										<p className='dueDate'>Due:</p>
										<DatePicker
											selected={selectedDate}
											onChange={date => setSelectedDate(date)}
											dateFormat="MMMM d"
											placeholderText="Select a date"
											className='date'
											showPopperArrow={false}
										/>
									</div>
									<p className='delete' >Delete task <MdDeleteForever /></p>
									<MdClose onClick={close} className='closer' />
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
