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
import confettiAnimation from '../../../asstes/Lottie-confetii.json';

export default function TaskModal({ task, onTaskDelete, onTaskEdit }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        setEditedTask({ ...task });
    }, [task]);

    const formatTime = (time) => {
        if (!time) return '';
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const formattedHours = hours.toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes}`;
    };

    const handleEditTask = async () => {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token');
        const taskId = editedTask.id;

        try {
            const response = await fetch(`https://startaskzbackend-production.up.railway.app/user/update-task/${userId}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editedTask),
            });

            if (response.ok) {
                const updatedTask = await response.json();
                console.log('Task updated successfully:', updatedTask);
                onTaskEdit(updatedTask.id, new Date(updatedTask.startDate), updatedTask);
            } else {
                const errorData = await response.json();
                console.error('Error updating task:', errorData);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };
    const handleDeleteTask = async () => {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token');
        const taskId = task.id;

        try {
            const response = await fetch(`https://startaskzbackend-production.up.railway.app/user/delete-task/${userId}/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.message);
                onTaskDelete(taskId, task.startDate);
            } else {
                const errorText = await response.text();
                console.error('Error deleting task:', errorText);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleTimeChange = (e) => {
        const { value } = e.target;
        const [hours, minutes] = value.split(':');

        let date;
        if (editedTask.startTime) {
            date = new Date(editedTask.startTime);
        } else {
            date = new Date();
        }

        const updatedHours = parseInt(hours, 10);
        const updatedMinutes = parseInt(minutes, 10);
        date.setHours(updatedHours, updatedMinutes, 0, 0);

        setEditedTask((prevState) => ({
            ...prevState,
            startTime: date.toISOString(),
        }));
    };

    const handleCompletionToggle = async () => {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token');
        const taskId = editedTask.id;
        const updatedTask = {
            ...editedTask,
            taskStatus: editedTask.taskStatus === 'completed' ? 'incomplete' : 'completed',
        };

        try {
            const response = await fetch(`https://startaskzbackend-production.up.railway.app/user/update-task/${userId}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTask),
            });

            if (response.ok) {
                const result = await response.json();
                onTaskEdit(result.id, result.startDate, result);
                setEditedTask(result);
            } else {
                const errorData = await response.json();
                console.error('Error updating task:', errorData);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleDateSelect = (date) => {
        setEditedTask((prevState) => ({
            ...prevState,
            startDate: date.toISOString(),
        }));
        setShowCalendar(false);
    };

    const handleCategoryChange = (taskCategory) => {
        setEditedTask((prevState) => ({
            ...prevState,
            taskCategory,
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

    return (
        <div className='task-container'>
            {showConfetti && (
                <div className="confetti-container">
                    <Lottie options={lottieOptions} height={150} width={110} />
                </div>
            )}
            <div className="iconsCont">
                {task?.taskStatus === 'completed' ? (
                    <i className='bx bxs-check-circle' onClick={handleCompletionToggle}></i>
                ) : (
                    <i className='bx bx-check-circle' onClick={handleCompletionToggle}></i>
                )}
            </div>

            <Popup
                trigger={(
                    <div className={`container ${task?.taskStatus === 'completed' ? 'completed' : ''}`}>
                        <div className="title">
                            <p>{task?.taskName}</p>
                            <div className='time'>{task?.startTime ? formatTime(task.startTime) : ''}</div>
                        </div>
                        <div>
                            <div className="lowerCont">
                                <div className="task-modal-category">
                                    <p><span className='ash'>#</span>{task?.taskCategory}</p>
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
                                                <p>#{editedTask.taskCategory || 'Select Category'}</p>
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
                                                <p>{editedTask.startDate ? new Date(editedTask.startDate).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Start'}</p>
                                            </div>
                                            {showCalendar && (
                                                <div className='edit-calendar-container'>
                                                    <Calendar onDateSelect={(date, e) => handleDateSelect(date, e)} />
                                                </div>
                                            )}
                                        </div>
                                        <div className='delete-task' onClick={() => { handleDeleteTask(); close(); }}>
                                            <i className='bx bx-trash-alt'></i>
                                            <p>Delete</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="taskArea">
                                    <div className="taskInfo">
                                        {task?.taskStatus === 'completed' ? (
                                            <i className='bx bxs-check-circle' onClick={handleCompletionToggle}></i>
                                        ) : (
                                            <i className='bx bx-check-circle' onClick={handleCompletionToggle}></i>
                                        )}
                                        <textarea
                                            name="taskName"
                                            cols="28"
                                            rows="1"
                                            className="tickerTitle"
                                            value={editedTask.taskName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="taskDurations add-hover">
                                        <input
                                            type="time"
                                            name="startTime"
                                            value={editedTask.startTime ? formatTime(editedTask.startTime) : ''}
                                            onChange={handleTimeChange}
                                        />
                                    </div>
                                </div>
                                <button className="save-task-btn" onClick={() => { handleEditTask(); close(); }}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    );
}
