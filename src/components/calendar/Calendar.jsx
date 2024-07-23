import React, { useState, useEffect, useRef, useContext } from 'react';
import './calendar.css';
import arrowLeft from '../../asstes/icons/arrowLeft.svg';
import arrowRight from '../../asstes/icons/arrowRight.svg';
import WeatherInfo from '../weather/WeatherInfo';
import { DateContext } from '../../../hooks/DateContext';

// import { useCalendarContext } from '../../../hooks/CalendarContext';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

export default function Calendar({ onDateSelect }) {
    const isMounted = useRef(false);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentDate, setCurrentDate] = useState(new Date().getDate());
    const [weatherData, setWeatherData] = useState({});
    const [hoveredDate, setHoveredDate] = useState(null);
    const [weatherDataFetched, setWeatherDataFetched] = useState(false);
    const [selectedWeatherInfo, setSelectedWeatherInfo] = useState('');
    const [mounted, setMounted] = useState(false);
    const { setSelectedDate } = useContext(DateContext);
    // const { calendarData, setCalendarData } = useCalendarContext();
    // const { providerCurrentDay, providerCurrentDate, providerWeatherIcon, providerWeatherInfo } = calendarData;

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
        onDateSelect(date);
        setSelectedDate(date);
        console.log(date)
    };

    const renderCalendar = () => {
        const totalDays = daysInMonth(currentMonth, currentYear);
        const startingDay = firstDayOfMonth(currentMonth, currentYear);
        const today = new Date();
        const currentMonthYear = today.getFullYear() === currentYear && today.getMonth() === currentMonth;

        // Dates from previous month
        const previousMonthDays = [];
        const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const daysInPreviousMonth = daysInMonth(previousMonth, previousMonthYear);
        for (let i = startingDay - 1; i >= 0; i--) {
            previousMonthDays.push({ day: daysInPreviousMonth - i, isCurrentMonth: false });
        }

        // Dates from current month
        const currentMonthDays = Array.from({ length: totalDays }, (_, index) => ({
            day: index + 1,
            isCurrentMonth: true
        }));

        // Dates from next month
        const nextMonthDays = [];
        const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
        const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
        const remainingDays = 7 - (previousMonthDays.length + currentMonthDays.length) % 7;
        for (let i = 1; i <= remainingDays; i++) {
            nextMonthDays.push({ day: i, isCurrentMonth: false });
        }

        const allDays = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];

        return allDays.map((day, index) => {
            const classNames = ["day"];
            if (!day.isCurrentMonth) {
                classNames.push("other-month");
            } else if (currentMonthYear && day.day === today.getDate()) {
                classNames.push("current-date");
            }

            const currentDate = new Date(currentYear, currentMonth, day.day);
            const dateString = currentDate.toDateString();
            const weatherInfo = weatherData[dateString] && weatherData[dateString].weather.length > 0
                ? weatherData[dateString].weather[0].main
                : '';

            const handleMouseEnter = () => {
                setHoveredDate(new Date(currentDate));
                setSelectedWeatherInfo(weatherInfo);
            };

            const handleMouseLeave = () => {
                setHoveredDate(null);
                setSelectedWeatherInfo('');
            };

            const handleDateClick = () => {
                handleDateSelect(currentDate);
            };

            return (
                <div
                    key={`day-${index}`}
                    className={classNames.join(" ")}
                    onClick={handleDateClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {day.day}
                    {/* {hoveredDate && hoveredDate.toDateString() === currentDate.toDateString() && (
                        <WeatherInfo weatherInfo={selectedWeatherInfo} />
                    )} */}
                </div>
            );
        });
    };

    // useEffect(() => {
    //     if (!mounted) {
    //         const fetchWeatherData = async () => {
    //             try {
    //                 const daysInCurrentMonth = daysInMonth(currentMonth, currentYear);
    //                 const firstDayOfCurrentMonth = new Date(currentYear, currentMonth, 1);

    //                 const weatherDataForMonth = {};

    //                 for (let i = 0; i < daysInCurrentMonth; i++) {
    //                     const date = new Date(firstDayOfCurrentMonth);
    //                     date.setDate(date.getDate() + i);

    //                     // Check if the date is from the current month
    //                     const isCurrentMonth = date.getMonth() === currentMonth;

    //                     // Retrieve latitude and longitude from local storage
    //                     const latitude = parseFloat(localStorage.getItem('latitude'));
    //                     const longitude = parseFloat(localStorage.getItem('longitude'));

    //                     // Fetch weather data only for dates in the current month
    //                     if (isCurrentMonth) {
    //                         const apiKey = 'e5883bae80f6bb5683f7e4a084f547fe';
    //                         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&dt=${Math.floor(date.getTime() / 1000)}`;

    //                         const response = await fetch(apiUrl);
    //                         if (response.ok) {
    //                             const data = await response.json();
    //                             weatherDataForMonth[date.toDateString()] = data;
    //                             // console.log('Calendar', data);
    //                         } else {
    //                             console.error('Error fetching weather data:', response.statusText);
    //                         }
    //                     }
    //                 }

    //                 setWeatherData(weatherDataForMonth);
    //                 setWeatherDataFetched(true);
    //                 setMounted(true);
    //             } catch (error) {
    //                 console.error('Error fetching weather data:', error);
    //             }
    //         };

    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 fetchWeatherData();
    //             },
    //             (error) => {
    //                 console.error('Error getting location:', error);
    //                 alert('Unable to get your location. Please allow location access for this feature.');
    //             }
    //         );
    //     }
    //     console.log()
    // }, [currentMonth, currentYear, weatherDataFetched, mounted]);


    return (
        <div className="calendar">
            <div className="navigation">
                <div className='nav-arrow' onClick={prevMonth}>
                    <i className='bx bx-chevron-left'></i>
                </div>
                <div className="current-month">{`${monthNames[currentMonth]} ${currentYear}`}</div>
                <div className='nav-arrow' onClick={nextMonth}>
                    <i className='bx bx-chevron-right'></i>
                </div>
            </div>
            <div className="days-of-week">
                {daysOfWeek.map((day, index) => (
                    <div key={`day-${index}`} className="day-of-week">
                        {day}
                    </div>
                ))}
            </div>
            <div className="dates">
                {renderCalendar()}
            </div>
        </div>
    );
}