import React, { useEffect, useContext, useMemo, useState } from 'react';
import DailyList from './DailyList';
import './dailyList.css';
import AddTask from './AddTask';
import ProgressBar from '../../progressBar/ProgressBar';
import WeatherInfo from '../../weather/WeatherInfo';
import { WeatherContext } from '../../../../hooks/WeatherProvider';
import { CategoryContext } from '../../../../hooks/CategoryContext';

export default function DailyTaskList({
    day,
    date,
    tasks,
    onTaskAdd,
    onTaskEdit,
    onTaskDelete,
    weatherData,
    filterStatus, // Receive filterStatus as a prop
}) {
    const { setWeatherBarVisible, setSelectedDate, setSelectedWeatherData, setWeatherIcon, setLocation } =
        useContext(WeatherContext);
    const { selectedCategory } = useContext(CategoryContext);
    
    const [timeToNextTask, setTimeToNextTask] = useState('');

    const calculateOverallProgress = () => {
        if (tasks.length === 0) return 0;
        const completedTasks = tasks.filter(task => task.taskStatus === 'completed');
        return (completedTasks.length / tasks.length) * 100;
    };

    const progress = calculateOverallProgress();

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            const aStartTime = a.startTime ? new Date(a.startTime) : new Date();
            const bStartTime = b.startTime ? new Date(b.startTime) : new Date();
            return aStartTime - bStartTime;
        });
    }, [tasks]);

    const handleWeatherInfoClick = () => {
        setWeatherBarVisible(true);
        setSelectedDate(date);
        setSelectedWeatherData(weatherData);
        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
            setWeatherIcon(weatherData.weather[0].icon);
            setLocation(weatherData.name);
        }
    };

    // Filter tasks based on filterStatus
    const filteredTasks = useMemo(() => {
        if (selectedCategory === 'All') {
            if (filterStatus === 'All') {
                return sortedTasks;
            } else if (filterStatus === 'Completed') {
                return sortedTasks.filter((task) => task.taskStatus === 'completed');
            } else if (filterStatus === 'Pending') {
                return sortedTasks.filter((task) => task.taskStatus !== 'completed');
            }
        } else {
            if (filterStatus === 'All') {
                return sortedTasks.filter((task) => task.taskCategory === selectedCategory);
            } else if (filterStatus === 'Completed') {
                return sortedTasks.filter(
                    (task) => task.taskCategory === selectedCategory && task.taskStatus === 'completed'
                );
            } else if (filterStatus === 'Pending') {
                return sortedTasks.filter(
                    (task) => task.taskCategory === selectedCategory && task.taskStatus !== 'completed'
                );
            }
        }
        return sortedTasks;
    }, [sortedTasks, selectedCategory, filterStatus]);

    useEffect(() => {
        const calculateTimeToNextTask = () => {
            const now = new Date();
            const nextTask = sortedTasks.find(task => new Date(task.startTime) > now);

            if (!nextTask) {
                setTimeToNextTask('');
                return;
            }

            const nextTaskTime = new Date(nextTask.startTime);
            const timeDifference = nextTaskTime - now;
            const minutesToNextTask = Math.floor(timeDifference / 60000);

            setTimeToNextTask(`${minutesToNextTask} min to next task`);
        };

        calculateTimeToNextTask();
        const intervalId = setInterval(calculateTimeToNextTask, 60000); // Update every minute

        return () => clearInterval(intervalId); // Clear interval on component unmount
    }, [sortedTasks]);

    return (
        <div className="dailyTaskList">
            <div className="dailyTaskList-date">
                <div className="dailyTaskList-date-details">
                    <h2>{day}</h2>
                    {weatherData && weatherData.weather && weatherData.weather.length > 0 && (
                        <div className='weather-info' onClick={handleWeatherInfoClick}>
                            <WeatherInfo weatherInfo={weatherData.weather[0].main} />
                        </div>
                    )}
                </div>
                <p className="dailyList-date">{date}</p>
            </div>
            <ProgressBar progress={progress} className={tasks.length > 0 ? 'visible' : 'hidden'} />
            {/* {timeToNextTask && (
                <div className="next-task-timer">
                    <p>{timeToNextTask}</p>
                </div>
            )} */}
            <AddTask onTaskAdd={onTaskAdd} />
            <DailyList tasks={filteredTasks} onTaskEdit={onTaskEdit} onTaskDelete={onTaskDelete} />
        </div>
    );
}
