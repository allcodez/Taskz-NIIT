import React, { useEffect, useState } from 'react';
import './taskModal.css';
import { GrStatusGood } from "react-icons/gr";
import { CiCalendarDate, CiClock2, CiPlay1 } from "react-icons/ci";
import { MdClose, MdDeleteForever } from "react-icons/md";
import Popup from 'reactjs-popup';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '../../calendar/Calendar';
import CategoryOption from '../../categories/CategoryOption';
import Lottie from 'react-lottie';
import confettiAnimation from '../../../asstes/Lottie-confetii.json'; // Adjust the path to your JSON file
import ProgressBar from '../../progressBar/ProgressBar'; // Import the ProgressBar component

export default function TaskModal({ task, onTaskDelete, onTaskEdit }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);

    const handleEditTask = (close) => {
        console.log("Saving task:", editedTask);  // Logging for debugging
        onTaskEdit(editedTask.id, editedTask.date, editedTask);
        close();
    };

    const handleDeleteTask = () => {
        onTaskDelete(task.id, task.date);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCompletionToggle = (close) => {
        const updatedTask = { ...editedTask, completed: !editedTask.completed };
        setEditedTask(updatedTask);
        onTaskEdit(updatedTask.id, updatedTask.date, updatedTask);
        if (updatedTask.completed) {
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 1500); // Show confetti for 1.5 seconds
        }
        close();
    };

    const handleDateSelect = (date) => {
        console.log("Selected date:", date);  // Logging for debugging
        setEditedTask((prevState) => ({
            ...prevState,
            date: date.toISOString(),  // Ensure the date is in a proper format
        }));
        setShowCalendar(false);
    };

    const handleCategoryChange = (category) => {
        setEditedTask((prevState) => ({
            ...prevState,
            category,
        }));
        setShowCategory(false);
    };

    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: confettiAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    // Calculate the progress percentage
    const progress = editedTask.completed ? 100 : 0;

    return (
        <div className='task-container'>
            {showConfetti && (
                <div className="confetti-container">
                    <Lottie options={lottieOptions} height={150} width={110} />
                </div>
            )}
            <div className="iconsCont">
                {task?.completed ? (
                    <i className='bx bxs-check-circle' onClick={handleCompletionToggle}></i>
                ) : (
                    <i className='bx bx-check-circle' onClick={handleCompletionToggle}></i>
                )}
            </div>

            <Popup
                trigger={(
                    <div className={`container ${task?.completed ? 'completed' : ''}`}>
                        <div className="title">
                            <p>{task?.name}</p>
                            <div className='time'>{task?.time}</div>
                        </div>
                        <div>
                            <div className="lowerCont">
                                <div className="task-modal-category">
                                    <p><span className='ash'>#</span>{task?.category}</p>
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
                            <div className="modalI edit-task-modal">
                                <div className="icon-line">
                                    <div className="categoryI">
                                        <div onClick={() => setShowCategory(!showCategory)} className='add-hover'>
                                            <div className='add-task-category'>
                                                <p>#{editedTask.category || 'Select Category'}</p>
                                            </div>
                                            {showCategory && (
                                                <div className='edit-category-container'>
                                                    <CategoryOption handleChange={handleCategoryChange} />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="option">
                                        <div onClick={() => setShowCalendar(!showCalendar)} className='add-hover'>
                                            <div className='add-task-date'>
                                                <i className='bx bx-calendar-alt'></i>
                                                <p>{editedTask.date ? new Date(editedTask.date).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Start'}</p>
                                            </div>
                                            {showCalendar && (
                                                <div className='edit-calendar-container'>
                                                    <Calendar onDateSelect={handleDateSelect} />
                                                </div>
                                            )}
                                        </div>
                                        <div className='delete-task' onClick={handleDeleteTask}>
                                            <i className='bx bx-trash-alt'></i>
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="taskArea">
                                    <div className="taskInfo">
                                        <i className={task?.completed ? 'bx bxs-check-circle' : 'bx bx-check-circle'} onClick={() => handleCompletionToggle(close)}></i>
                                        <textarea
                                            name="name"
                                            cols="28"
                                            rows="1"
                                            className="tickerTitle"
                                            value={editedTask.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="taskDurations add-hover">
                                        <input
                                            type="time"
                                            name="time"
                                            value={editedTask.time}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                                {/* Add the progress bar here */}
                                
                                <button className="save-task-btn" onClick={() => handleEditTask(close)}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}
