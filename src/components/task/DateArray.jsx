import React, { useState, useContext, useEffect, useRef } from 'react';
import './dateArray.css';
import DailyTaskList from './Daily/DailyTaskList';
import TaskCalendar from '../task/TaskCalendar/TaskCalendar';
import { DateContext } from '../../../hooks/DateContext';
import { WeatherContext } from '../../../hooks/WeatherProvider';
import { TaskContext } from '../../../hooks/TaskContext';

export default function DateArray({ filterStatus, setFilterStatus, onTasksUpdate }) {
    const dates = TaskCalendar();
    const [currentDate] = useState(new Date());
    const { weatherData, setWeatherData, setSelectedWeatherData } = useContext(WeatherContext);
    const [weatherDataFetched, setWeatherDataFetched] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [needsRefetch, setNeedsRefetch] = useState(false);
    const { tasks, setTasks } = useContext(TaskContext);
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const scrollContainerRef = useRef(null);
    const dateRefs = useRef({});

    const handleTaskAdd = (selectedDate, newTask) => {
        setNeedsRefetch(true);
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
        if (scrollContainerRef.current && !mounted) {
            const today = new Date().toDateString();
            const currentDateElement = dateRefs.current[today];
            if (currentDateElement) {
                const scrollPosition = currentDateElement.offsetLeft - scrollContainerRef.current.offsetWidth / 65 + currentDateElement.offsetWidth / 65;
                scrollContainerRef.current.scrollLeft = scrollPosition;
            }
            setMounted(true);
        }

        if (selectedDate && dateRefs.current[selectedDate.toDateString()]) {
            const container = scrollContainerRef.current;
            const element = dateRefs.current[selectedDate.toDateString()];
            const elementRect = element.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            const scrollLeft = element.offsetLeft - container.offsetLeft - (containerRect.width / 65) + (elementRect.width / 65);

            container.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }

        if (!weatherDataFetched) {
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
                        // Parse the startedAt string into a Date object
                        const startedAt = new Date(task.startedAt);
                        
                        // Extract just the date part and create a new startDate
                        const startDate = new Date(startedAt.getFullYear(), startedAt.getMonth(), startedAt.getDate());
                        const dateString = startDate.toDateString(); // or toLocaleDateString() if you prefer
                        
                        if (!acc[dateString]) {
                            acc[dateString] = [];
                        }
                        
                        // Add the task to the array with both startedAt and startDate
                        acc[dateString].push({
                            ...task,
                            startedAt: startedAt,
                            startDate: startDate
                        });
                        
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
                        fetchTaskData();
                    },
                    (error) => {
                        console.error('Error getting location:', error);
                    }
                );
            }

            setWeatherDataFetched(true);
        }
    }, [selectedDate, needsRefetch, mounted, weatherData, weatherDataFetched]);

    const fetchTasks = async () => {
        const userId = sessionStorage.getItem('userId');
        // const token = sessionStorage.getItem('token');

        if (!userId) {
            console.error('User ID or token not found in session storage');
            return;
        }

        try {
            const response = await fetch(`https://star-taskz-backend.onrender.com/star-taskz/api/task/all/${userId}`, {
                method: 'GET',
                headers: {
                    // 'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 302) {
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

    const handleTaskUpdate = () => {
        setNeedsRefetch(true);
    };

    return (
        <div className="dateArray" ref={scrollContainerRef}>
            <DayList
                days={dates}
                tasks={tasks}
                onTaskEdit={handleTaskEdit}
                onTaskDelete={handleTaskDelete}
                onTaskUpdate={handleTaskUpdate}
                weatherData={weatherData}
                weatherDataFetched={weatherDataFetched}
                handleDateSelect={handleDateSelect}
                filterStatus={filterStatus}
                dateRefs={dateRefs}
                currentDate={currentDate}
            />
        </div>
    );
}

function DayList({ days, tasks, onTaskEdit, onTaskDelete, onTaskUpdate, weatherData, weatherDataFetched, handleDateSelect, filterStatus, dateRefs, currentDate }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to start of day for accurate comparison

    return (
        <div className="dayList">
            {days && days.length > 0 ? (
                days.map((day, index) => {
                    const dateString = day.date.toDateString();
                    const isCurrentDate = dateString === today.toDateString();
                    const isFutureDate = day.date > today;

                    return (
                        <div
                            className={`test ${isCurrentDate ? 'array-current-date' : ''} ${isFutureDate ? 'future-date' : ''}`}
                            key={index}
                            data-date={day.date.toISOString()}
                            // onClick={() => handleDateSelect(day.date)}
                            ref={el => dateRefs.current[dateString] = el}
                        >
                            <DailyTaskList
                                day={day.date.toLocaleDateString(undefined, { weekday: 'long' })}
                                date={day.date.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}
                                tasks={tasks[dateString] || []}
                                onTaskEdit={onTaskEdit}
                                onTaskDelete={onTaskDelete}
                                onTaskUpdate={onTaskUpdate}
                                weatherData={weatherDataFetched ? weatherData[dateString] : null}
                                key={index}
                                filterStatus={filterStatus}
                                isCurrentDate={isCurrentDate}
                            />
                        </div>
                    );
                })
            ) : (
                <div>No dates found</div>
            )}
        </div>
    );
}