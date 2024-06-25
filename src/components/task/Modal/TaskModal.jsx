import React, { useEffect, useState, useCallback } from 'react';
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
import schedule from 'node-schedule';

export default function TaskModal({ task, onTaskDelete, onTaskEdit }) {
    const [showCalendar, setShowCalendar] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [editedTask, setEditedTask] = useState({});
    const [showConfetti, setShowConfetti] = useState(false);
    const [alarmJobs, setAlarmJobs] = useState([]);
    const [activeNotifications, setActiveNotifications] = useState([]);

    useEffect(() => {
        if (task) {
            setEditedTask({ ...task });
        } else {
            setEditedTask({});
            cancelAlarms();
        }
        requestNotificationPermission();

        return () => {
            cancelAlarms();
        };
    }, [task]);

    useEffect(() => {
        scheduleAlarms();
    }, [editedTask]);

    const requestNotificationPermission = async () => {
        if (!('Notification' in window)) {
            console.error('This browser does not support desktop notifications');
            return;
        }

        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                console.log('Notification permission granted');
            } else {
                console.error('Notification permission denied');
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    };

    const scheduleAlarms = () => {
        if (!editedTask.startTime) return;

        const startTime = new Date(editedTask.startTime);
        const fiveMinutesBefore = new Date(startTime.getTime() - 5 * 60000);
        const oneMinuteBefore = new Date(startTime.getTime() - 60000);

        // Cancel existing alarms before scheduling new ones
        cancelAlarms();

        const fiveMinutesJob = schedule.scheduleJob(fiveMinutesBefore, () => {
            const taskName = editedTask.taskName;
            if (taskName) {
                showNotification(`Task "${taskName}" starts in 5 minutes!`);
            }
        });

        const oneMinuteJob = schedule.scheduleJob(oneMinuteBefore, () => {
            const taskName = editedTask.taskName;
            if (taskName) {
                showNotification(`Task "${taskName}" starts in 1 minute!`);
            }
        });

        setAlarmJobs([fiveMinutesJob, oneMinuteJob]);
    };

    const cancelAlarms = () => {
        alarmJobs.forEach(job => {
            if (job && typeof job.cancel === 'function') {
                job.cancel();
            }
        });
        setAlarmJobs([]);
    };

    const showNotification = (message) => {
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                // Prevent duplicate notifications
                const existingNotification = activeNotifications.find(
                    (notification) => notification.message === message && notification.notification.data === 'active'
                );

                if (existingNotification) return;

                const newNotification = new Notification(message, { data: 'active' });

                setActiveNotifications(prevNotifications => [
                    ...prevNotifications,
                    { message, notification: newNotification },
                ]);

                newNotification.addEventListener('close', () => {
                    setActiveNotifications(prevNotifications =>
                        prevNotifications.filter(
                            (notification) => notification.notification !== newNotification
                        )
                    );
                });
            } else {
                console.error('Notification permission denied');
            }
        } else {
            console.error('This browser does not support desktop notifications');
        }
    };

    const formatTime = (time) => {
        if (!time) return '';
        const date = new Date(time);
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const handleEditTask = useCallback(async () => {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token');
        const taskId = editedTask.id;

        if (!taskId) {
            console.warn('Task ID is not defined, skipping update.');
            return;
        }

        if (editedTask.startTime) {
            const startTime = new Date(editedTask.startTime);
            startTime.setHours(startTime.getHours() + 1);
            editedTask.startTime = startTime.toISOString();
        }

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
                const taskDate = new Date(updatedTask.startDate);
                const dateString = taskDate.toDateString();
                onTaskEdit(updatedTask.id, dateString, updatedTask);
                scheduleAlarms();
            } else {
                const errorData = await response.json();
                console.error('Error updating task:', errorData);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    }, [editedTask, onTaskEdit]);

    const handleDeleteTask = async () => {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token');
        const taskId = task.id;
        const taskDate = new Date(task.startDate);
        const dateString = taskDate.toDateString();

        // Cancel alarms immediately when delete is initiated
        cancelAlarms();

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
                onTaskDelete(taskId, dateString);
            } else {
                const errorText = await response.text();
                console.error('Error deleting task:', errorText);
                onTaskDelete(taskId, dateString);
            }
        } catch (error) {
            console.error('Network error:', error);
            onTaskDelete(taskId, dateString);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask(prevState => ({
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

        setEditedTask(prevState => ({
            ...prevState,
            startTime: date.toISOString(),
        }));
    };

    const handleCompletionToggle = async () => {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token');
        const taskId = editedTask.id;
        const taskDate = new Date(editedTask.startDate);
        const dateString = taskDate.toDateString();
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
                if (result.taskStatus === 'completed') {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 1500);
                }

                onTaskEdit(result.id, dateString, result);
                setEditedTask(result);
                scheduleAlarms();

                setTasks(prevTasks => {
                    const updatedTasks = { ...prevTasks };
                    if (updatedTasks[dateString]) {
                        updatedTasks[dateString] = updatedTasks[dateString].map(task =>
                            task.id === taskId ? result : task
                        );
                    }
                    return updatedTasks;
                });

            } else {
                const errorData = await response.json();
                console.error('Error updating task:', errorData);
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    const handleDateSelect = (date) => {
        setEditedTask(prevState => ({
            ...prevState,
            startDate: date.toISOString(),
        }));
        setShowCalendar(false);
    };

    const handleCategoryChange = (taskCategory) => {
        setEditedTask(prevState => ({
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
                    <Lottie options={lottieOptions} height={160} width={120} />
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
