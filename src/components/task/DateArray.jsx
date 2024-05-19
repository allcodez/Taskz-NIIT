import React, { useState, useContext, useEffect, useRef } from 'react';
import './dateArray.css';
import DailyTaskList from './Daily/DailyTaskList';
import TaskCalendar from '../task/TaskCalendar/TaskCalendar';
import { DateContext } from '../../../hooks/DateContext';
import { WeatherContext } from '../../../hooks/WeatherProvider';

export default function DateArray() {
    const dates = TaskCalendar();
    const [tasks, setTasks] = useState({});
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const scrollContainerRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState(new Date().getDate());
    const { weatherData, setWeatherData, setSelectedWeatherData } = useContext(WeatherContext);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [weatherDataFetched, setWeatherDataFetched] = useState(false);
    const [mounted, setMounted] = useState(false);

    const handleTaskAdd = (newTask) => {
        const dateString = newTask.date.toDateString();
        setTasks((prevTasks) => ({
            ...prevTasks,
            [dateString]: [...(prevTasks[dateString] || []), newTask],
        }));
    };

    const handleTaskEdit = (taskId, taskDate, editedTask) => {
        const dateString = taskDate.toDateString();
        setTasks((prevTasks) => ({
            ...prevTasks,
            [dateString]: prevTasks[dateString].map((task) =>
                task.id === taskId ? editedTask : task
            ),
        }));
    };

    const handleTaskDelete = (taskId, taskDate) => {
        const dateString = taskDate.toDateString();
        setTasks((prevTasks) => ({
            ...prevTasks,
            [dateString]: prevTasks[dateString].filter((task) => task.id !== taskId),
        }));
    };

    const prevMonth = () => {
        setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
        setCurrentDate(new Date().getDate()); // Reset current date when changing month
    };

    const nextMonth = () => {
        setCurrentMonth(nextMonth => (nextMonth === 11 ? 0 : nextMonth + 1));
        setCurrentYear(nextYear => (currentMonth === 11 ? nextYear + 1 : nextYear));
        setCurrentDate(new Date().getDate()); // Reset current date when changing month
    };

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        const dateString = date.toDateString();
        setSelectedWeatherData(weatherData[dateString]);
    };

    useEffect(() => {
        if (!mounted) {
            const fetchWeatherData = async () => {
                try {
                    const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
                    const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);

                    const weatherDataForMonth = {};

                    for (let i = 0; i < daysInCurrentMonth; i++) {
                        const date = new Date(firstDayOfCurrentMonth);
                        date.setDate(date.getDate() + i);

                        // Check if the date is from the current month
                        const isCurrentMonth = date.getMonth() === currentMonth;

                        // Retrieve latitude and longitude from local storage
                        const latitude = parseFloat(localStorage.getItem('latitude'));
                        const longitude = parseFloat(localStorage.getItem('longitude'));

                        // Fetch weather data only for dates in the current month
                        if (isCurrentMonth) {
                            const apiKey = 'e5883bae80f6bb5683f7e4a084f547fe';
                            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&dt=${Math.floor(date.getTime() / 1000)}`;

                            const response = await fetch(apiUrl);
                            if (response.ok) {
                                const data = await response.json();
                                weatherDataForMonth[date.toDateString()] = data;
                            } else {
                                console.error('Error fetching weather data:', response.statusText);
                            }
                        }
                    }

                    setWeatherData((prevWeatherData) => ({
                        ...prevWeatherData,
                        ...weatherDataForMonth,
                    }));

                    setWeatherDataFetched(true);
                    setMounted(true);
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            };

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherData();
                },
                (error) => {
                    console.error('Error getting location:', error);
                    alert('Unable to get your location. Please allow location access for this feature.');
                }
            );
        }
    }, [currentMonth, currentYear, weatherDataFetched, mounted, weatherData]);

    return (
        <div className="dateArray" ref={scrollContainerRef}>
            <DayList
                days={dates}
                tasks={tasks}
                onTaskAdd={handleTaskAdd}
                onTaskEdit={handleTaskEdit}
                onTaskDelete={handleTaskDelete}
                weatherData={weatherData}
                weatherDataFetched={weatherDataFetched}
                handleDateSelect={handleDateSelect}
            />
        </div>
    );
}

function DayList({ days, tasks, onTaskAdd, onTaskEdit, onTaskDelete, weatherData, weatherDataFetched, handleDateSelect }) {
    return (
        <div className="dayList">
            {days && days.length > 0 ? (
                days.map((day, index) => (
                    <div className="test" key={index} data-date={day.date.toISOString()} onClick={() => handleDateSelect(day.date)}>
                        <DailyTaskList
                            day={day.date.toLocaleDateString(undefined, { weekday: 'long' })}
                            date={day.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                            tasks={tasks[day.date.toDateString()] || []}
                            onTaskAdd={onTaskAdd}
                            onTaskEdit={onTaskEdit}
                            onTaskDelete={onTaskDelete}
                            weatherData={weatherDataFetched ? weatherData[day.date.toDateString()] : null}
                            key={index}
                        />
                    </div>
                ))
            ) : (
                <div>No dates found</div>
            )}
        </div>
    );
}
