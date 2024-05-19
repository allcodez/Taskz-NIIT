import React, { useEffect, useContext } from 'react';
import DailyList from './DailyList';
import './dailyList.css';
import AddTask from './AddTask';
import ProgressBar from '../../progressBar/ProgressBar';
import WeatherInfo from '../../weather/WeatherInfo';
import { WeatherContext } from '../../../../hooks/WeatherProvider';

export default function DailyTaskList({ day, date, tasks, onTaskAdd, onTaskEdit, onTaskDelete, weatherData }) {
    const {
        setWeatherBarVisible,
        setSelectedDate,
        setSelectedWeatherData,
        setWeatherIcon,
        setLocation
    } = useContext(WeatherContext);

    const calculateOverallProgress = () => {
        if (tasks.length === 0) return 0;
        const completedTasks = tasks.filter(task => task.completed);
        return (completedTasks.length / tasks.length) * 100;
    };

    const progress = calculateOverallProgress();

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData]);

    const handleWeatherInfoClick = () => {
        setWeatherBarVisible(true);
        setSelectedDate(date);
        setSelectedWeatherData(weatherData);
        if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
            setWeatherIcon(weatherData.weather[0].icon);
            setLocation(weatherData.name);
        }
    };

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
            <DailyList tasks={tasks} onTaskEdit={onTaskEdit} onTaskDelete={onTaskDelete} />
        </div>
    );
}
