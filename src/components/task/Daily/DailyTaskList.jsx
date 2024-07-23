import React, { useEffect, useContext, useMemo } from 'react';
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

    const calculateOverallProgress = () => {
        if (tasks.length === 0) return 0;
        const completedTasks = tasks.filter(task => task.taskStatus === 'completed');
        return (completedTasks.length / tasks.length) * 100;
    };

    const progress = calculateOverallProgress();

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
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
            <AddTask onTaskAdd={onTaskAdd} />
            <DailyList tasks={filteredTasks} onTaskEdit={onTaskEdit} onTaskDelete={onTaskDelete} />
        </div>
    );
}