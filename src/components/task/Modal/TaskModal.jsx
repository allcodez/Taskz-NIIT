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
	const [selectedDateI, setSelectedDateI] = useState(null);
	const [tickName, setTickName] = useState("tick-icon");

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
								<GrStatusGood className='tick-icon' onClick={() => {
									
								}}/>
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
											placeholderText=" "
											className='date'
											showPopperArrow={false}
										/>
									</div>
									<div className='due'>
										<p className='dueDate'>Due:</p>
										<DatePicker
											selected={selectedDateI}
											onChange={dateI => setSelectedDateI(dateI)}
											dateFormat="MMMM d"
											placeholderText=" "
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
										<GrStatusGood className='ticker' />
										<p className='tickerTitle'>{task.taskTitle}</p>
									</div>
									<div className="taskDurations">
										<CiPlay1 />
										<div className="actual">
											<p>Duration</p>
											<select name="actual" id="" className='select'>
											<option value="0" disabled>--:--</option>
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
										</div>									</div>
								</div>
							</div>
							<div className="taskArena">
							<textarea placeholder='Notes...' name="" id="" cols="55" rows="7"></textarea>
							</div>
							<div className="divider"></div>

						</div>
					</div>

				</div>
			)}
		</Popup>
	);
}
