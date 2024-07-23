import React, { useState, useContext, useEffect, useRef } from 'react';
import './dateArray.css';
import DailyTaskList from './Daily/DailyTaskList';
import TaskCalendar from '../task/TaskCalendar/TaskCalendar';
import { DateContext } from '../../../hooks/DateContext';
import { WeatherContext } from '../../../hooks/WeatherProvider';
import { TaskContext } from '../../../hooks/TaskContext';

export default function DateArray({ filterStatus, setFilterStatus, onTasksUpdate }) {
    const dates = TaskCalendar();
    // const [tasks, setTasks] = useState({});
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const scrollContainerRef = useRef(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState(new Date().getDate());
    const { weatherData, setWeatherData, setSelectedWeatherData } = useContext(WeatherContext);
    const [hoveredDate, setHoveredDate] = useState(null);
    const [weatherDataFetched, setWeatherDataFetched] = useState(false);
    const [mounted, setMounted] = useState(false);
    // const [filterStatus, setFilterStatus] = useState('All');
    const [needsRefetch, setNeedsRefetch] = useState(false);
    const { tasks, setTasks } = useContext(TaskContext);

    const handleTaskAdd = (selectedDate, newTask) => {
        setNeedsRefetch(true);
        // if (selectedDate instanceof Date && !isNaN(selectedDate)) {
        //     const dateString = selectedDate.toDateString();
        //     setTasks((prevTasks) => ({
        //         ...prevTasks,
        //         [dateString]: [...(prevTasks[dateString] || []), newTask],
        //     }));
        // } else {
        //     console.error('selectedDate is not a valid Date:', selectedDate);
        // }
    };

    const handleTaskDelete = (taskId, dateString) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            updatedTasks[dateString] = prevTasks[dateString].filter((task) => task.id !== taskId);
            return updatedTasks;
        });
    };

    const handleTaskEdit = (taskId, dateString, updatedTask) => {
        setTasks((prevTasks) => {
            const updatedTasks = { ...prevTasks };
            const tasksForDate = prevTasks[dateString] || [];
            const updatedTasksForDate = tasksForDate.map((task) =>
                task.id === taskId ? updatedTask : task
            );
            updatedTasks[dateString] = updatedTasksForDate;
            return updatedTasks;
        });
    };

    const prevMonth = () => {
        setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
        setCurrentDate(new Date().getDate());
    };

    const nextMonth = () => {
        setCurrentMonth(nextMonth => (nextMonth === 11 ? 0 : nextMonth + 1));
        setCurrentYear(nextYear => (currentMonth === 11 ? nextYear + 1 : nextYear));
        setCurrentDate(new Date().getDate());
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
                    const latitude = parseFloat(localStorage.getItem('latitude'));
                    const longitude = parseFloat(localStorage.getItem('longitude'));

                    const apiKey = 'e5883bae80f6bb5683f7e4a084f547fe';
                    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&cnt=40`;

                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const data = await response.json();
                        const forecastData = {};

                        data.list.forEach((forecast) => {
                            const date = new Date(forecast.dt * 1000);
                            const dateString = date.toDateString();
                            forecastData[dateString] = forecast;
                        });

                        setWeatherData(forecastData);
                        setWeatherDataFetched(true);
                        setMounted(true);
                    } else {
                        console.error('Error fetching weather data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            };

            const fetchTaskData = async () => {
                const tasks = await fetchTasks();
                if (tasks) {
                    const tasksByDate = tasks.reduce((acc, task) => {
                        const dateString = new Date(task.startDate).toDateString();
                        if (!acc[dateString]) {
                            acc[dateString] = [];
                        }
                        acc[dateString].push(task);
                        return acc;
                    }, {});
                    setTasks(tasksByDate);
                    setNeedsRefetch(false);
                }
            };

            if (needsRefetch) {
                fetchTaskData();
            } else {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        fetchWeatherData();
                        fetchTaskData(); // Call fetchTaskData on initial render
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                        // alert('Unable to get your location. Please allow location access for this feature.');
                    }
                );
            }

            setMounted(true);
        }
    }, [needsRefetch, mounted, weatherData]);

    const fetchTasks = async () => {
        const userId = sessionStorage.getItem('userId');
        const token = sessionStorage.getItem('token');

        if (!userId || !token) {
            console.error('User ID or token not found in session storage');
            return;
        }

        try {
            const response = await fetch(`https://startaskzbackend-production.up.railway.app/user/get-tasks/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const tasks = await response.json();
                console.log('Tasks retrieved successfully:', tasks);
                return tasks;
            } else {
                const errorData = await response.json();
                console.error('Error fetching tasks:', errorData);
                return null;
            }
        } catch (error) {
            console.error('Network error:', error);
            return null;
        }
    };

    return (
        <div className="dateArray" ref={scrollContainerRef}>
            <DayList
                days={dates}
                tasks={tasks}
                onTaskEdit={handleTaskEdit}
                onTaskDelete={handleTaskDelete}
                weatherData={weatherData}
                weatherDataFetched={weatherDataFetched}
                handleDateSelect={handleDateSelect}
                filterStatus={filterStatus}
            />
        </div>
    );
}

// DayList component
function DayList({ days, tasks, onTaskEdit, onTaskDelete, weatherData, weatherDataFetched, handleDateSelect, onTaskAdd, filterStatus }) {
    return (
        <div className="dayList">
            {days && days.length > 0 ? (
                days.map((day, index) => (
                    <div className="test" key={index} data-date={day.date.toISOString()} onClick={() => handleDateSelect(day.date)}>
                        <DailyTaskList
                            day={day.date.toLocaleDateString(undefined, { weekday: 'long' })}
                            date={day.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                            tasks={tasks[day.date.toDateString()] || []}
                            onTaskEdit={onTaskEdit}
                            onTaskDelete={onTaskDelete}
                            weatherData={weatherDataFetched ? weatherData[day.date.toDateString()] : null}
                            key={index}
                            onTaskAdd={onTaskAdd}
                            filterStatus={filterStatus} // Pass filterStatus as a prop
                        />
                    </div>
                ))
            ) : (
                <div>No dates found</div>
            )}
        </div>
    );
}
