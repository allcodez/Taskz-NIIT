import React, { useEffect, useState } from 'react';
import './sideBar.css';
import Calendar from '../calendar/Calendar';
import Category from '../categories/Category';
import Dropdown from '../dropdown/Dropdown';
import { Navigate, useNavigate } from 'react-router-dom';
import logo from '../../asstes/images/logo.jpg'

export default function SideBar() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode === 'true';
    });
    const [showCalendar, setShowCalendar] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const navigate = useNavigate()

    const categoriesData = [
        { name: 'All' },
        { name: 'Work' },
        { name: 'Personal' },
        { name: 'Study' }
    ];

    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
        setShowCalendar(!showCalendar);
    };

    const handleDateSelect = (date) => {
        console.log('Selected date:', date);
    };

    const handleLogot = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login');
    };


    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        localStorage.setItem('darkMode', newMode);
        setIsDarkMode(newMode);
        if (newMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    };

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const apiKey = '55a2443648a1fec91d831eb470f33fd0';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const data = await response.json();
                        setWeatherData(data);
                    } else {
                        console.error('Error fetching weather data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                // alert('Unable to get your location. Please allow location access for this feature.');
            }
        );
    }, [isDarkMode]);

    return (
        <nav className={isSidebarClosed ? "sidebar close" : "sidebar"}>
            <header>
                <div className="image-text">
                    <span className="image">
                        <img src={logo} alt=""/>
                    </span>
                    <div className="text logo-text">
                        <span className="name">Star Taskz</span>
                        {/* <Dropdown /> */}
                    </div>
                </div>
                {/* <i className={`bx ${isSidebarClosed ? 'bx-chevron-right' : 'bx-chevron-left'} toggle`} onClick={toggleSidebar}></i> */}
            </header>

            <div className="menu-bar">
                <div className="menu-content" style={{ overflowY: "auto" }}>
                    {showCalendar && <Calendar onDateSelect={handleDateSelect} />}

                    <ul className="menu-links">
                        <div className="menu-title">
                            <hr />
                            CATEGORIES
                        </div>
                        {categoriesData.map((category, index) => (
                            <Category key={index} category={category} />
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bottom-content">
                <li className="sidebar-bottom" onClick={handleLogot}>
                    <a onClick={handleLogot}>
                        <i className='bx bx-log-out icon'></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>
                <li className="mode sidebar-bottom" onClick={toggleDarkMode}>
                    <div className="sun-moon">
                        {isDarkMode ? (
                            <i className='bx bx-moon icon moon'></i>
                        ) : (
                            <i className='bx bx-sun icon sun'></i>
                        )}
                    </div>
                    <span className="mode-text text">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>
                </li>
                <li className="sidebar-bottom">
                    {weatherData && (
                        <>
                            <i className='bx bx-current-location icon'></i>
                            <div>
                                <span className="text nav-text">{weatherData.sys.country}, {weatherData.name}</span>
                                <p className='bottom-weather'>{weatherData.main.temp}°C, {weatherData.weather[0].main}</p>
                            </div>
                        </>
                    )}
                </li>
            </div>
        </nav>
    );
}
