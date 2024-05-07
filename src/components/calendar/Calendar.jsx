// Calendar.jsx
import React, { useState, useEffect, useRef } from 'react';
import './calendar.css';
import arrowLeft from '../../asstes/icons/arrowLeft.svg';
import arrowRight from '../../asstes/icons/arrowRight.svg';
import WeatherInfo from './WeatherInfo';

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

function Calendar() {
    const isMounted = useRef(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [weatherData, setWeatherData] = useState({});
    const [hoveredDate, setHoveredDate] = useState(null);
    const [weatherDataFetched, setWeatherDataFetched] = useState(false);
    const [selectedWeatherInfo, setSelectedWeatherInfo] = useState('');
    const [mounted, setMounted] = useState(false);

    const prevMonth = () => {
        setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
    };

    const nextMonth = () => {
        setCurrentMonth(nextMonth => (nextMonth === 11 ? 0 : nextMonth + 1));
        setCurrentYear(nextYear => (currentMonth === 11 ? nextYear + 1 : nextYear));
    };

    const daysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const totalDays = daysInMonth(currentMonth, currentYear);
        const startingDay = firstDayOfMonth(currentMonth, currentYear);
        const today = new Date();

        const calendarArray = [];

        // Dates from previous month
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const daysInPreviousMonth = daysInMonth(previousMonth, previousMonthYear);
        for (let i = startingDay - 1; i >= 0; i--) {
            const date = daysInPreviousMonth - i;
            const currentDate = new Date(previousMonthYear, previousMonth, date);
            calendarArray.push({ date: currentDate, day: date, isCurrentMonth: false });
        }

        // Dates from current month
        for (let i = 1; i <= totalDays; i++) {
            const currentDate = new Date(currentYear, currentMonth, i);
            calendarArray.push({ date: currentDate, day: i, isCurrentMonth: true });
        }

        // Dates from next month
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const remainingDays = 7 - (calendarArray.length % 7);
        for (let i = 1; i <= remainingDays; i++) {
            const currentDate = new Date(nextMonthYear, nextMonth, i);
            calendarArray.push({ date: currentDate, day: i, isCurrentMonth: false });
        }

        return calendarArray;
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
                            const apiKey = '55a2443648a1fec91d831eb470f33fd0';
                            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&dt=${Math.floor(date.getTime() / 1000)}`;

                            const response = await fetch(apiUrl);
                            if (response.ok) {
                                const data = await response.json();
                                weatherDataForMonth[date.toDateString()] = data;
                                console.log('Calendar', data);
                            } else {
                                console.error('Error fetching weather data:', response.statusText);
                            }
                        }
                    }

                    setWeatherData(weatherDataForMonth);
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
    }, [currentMonth, currentYear, weatherDataFetched, mounted]);

    return renderCalendar();
    // return (
    //     <div className="calendar">
    //         <div className="navigation">
    //             <button onClick={prevMonth}>
    //                 <img src={arrowLeft} alt="Previous Month" />
    //             </button>
    //             <div className="current-month">{`${monthNames[currentMonth]} ${currentYear}`}</div>
    //             <button onClick={nextMonth}>
    //                 <img src={arrowRight} alt="Next Month" />
    //             </button>
    //         </div>
    //         <div className="days-of-week">
    //             {daysOfWeek.map((day, index) => (
    //                 <div key={`day-${index}`} className="day-of-week">
    //                     {day}
    //                 </div>
    //             ))}
    //         </div>
    //         <div className="dates">
    //             {renderCalendar()}
    //         </div>
    //     </div>
    // );
}

export default Calendar;
