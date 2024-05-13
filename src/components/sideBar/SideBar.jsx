import React, { useEffect, useState } from 'react';
import './sideBar.css';
import Calendar from '../calendar/Calendar';
import Category from '../categories/Category';
import Dropdown from '../dropdown/Dropdown';
import { FaHashtag } from "react-icons/fa6";
// import { CalendarProvider } from '../../../hooks/CalendarContext';

export default function SideBar() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showCalendar, setShowCalendar] = useState(true);
    const [weatherData, setWeatherData] = useState(null);

    const categoriesData = [
        {
            name: 'Work',
        },
        {
            name: 'Personal',
        },
        {
            name: 'Study',
        }
        // ,
        // {
        //     name: 'Uncategorised',
        // }
    ];

    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
        setShowCalendar(!showCalendar)
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark'); // Toggle dark mode class on body
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // console.log(`Your location: Latitude - ${latitude}, Longitude - ${longitude}`);
                // alert(`Your location is: Latitude - ${latitude}, Longitude - ${longitude}`);

                // Save latitude and longitude to local storage
                // localStorage.setItem('latitude', latitude.toString());
                // localStorage.setItem('longitude', longitude.toString());

                // Make a GET request to OpenWeatherMap API
                const apiKey = '55a2443648a1fec91d831eb470f33fd0';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        // const weatherData = await response.json();
                        const data = await response.json();
                        setWeatherData(data);
                        console.log('Weather data:', weatherData);
                        // You can now use the weather data as needed, such as displaying it on the UI
                    } else {
                        console.error('Error fetching weather data:', response.statusText);
                        // Handle error fetching weather data
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    // Handle error fetching weather data
                }

                // Rest of your signup logic (creating account with form data)
                // ...
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please allow location access for this feature.');
            }
        );
    }, []);

    return (
        <nav className={isSidebarClosed ? "sidebar close" : "sidebar"}>
            <header>
                <div className="image-text">
                    <span className="image">
                        {/* <img src="logo.png" alt=""> */}
                    </span>
                    <div className="text logo-text">
                        {/* <span className="name">Star Taskz</span> */}
                        <Dropdown />
                    </div>
                </div>
                {/* <i className={`bx ${isSidebarClosed ? 'bx-chevron-right' : 'bx-chevron-left'} toggle`} onClick={toggleSidebar}></i> */}
            </header>

            <div className="menu-bar">
                {/* <li className="search-box" onClick={() => setIsSidebarClosed(false)}>
                        <i className='bx bx-search icon'></i>
                        <input type="text" placeholder="Search..." />
                    </li> */}
                <div className="menu-content" style={{ overflowY: "auto" }}>
                    {showCalendar && (
                        // <CalendarProvider>
                        //     <Calendar />
                        // </CalendarProvider>
                        <Calendar />
                    )}

                    {/* Categories */}
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
                <li className=" sidebar-bottom">
                    <a href="#">
                        <i className='bx bx-log-out icon'></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>
                <li className="mode sidebar-bottom" onClick={toggleDarkMode}>
                    <div className="sun-moon">
                        <i className={`bx bx-moon icon ${isDarkMode ? 'moon' : 'sun'}`}></i>
                        <i className={`bx bx-sun icon ${isDarkMode ? 'sun' : 'moon'}`}></i>
                    </div>
                    <span className="mode-text text">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>
                </li>
                {/* Location and weather info for the cureent */}
                {/* <li className="sidebar-bottom">
                    {weatherData && (
                        <>
                            <p>Temperature: {weatherData.main.temp}°C</p>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                            <p>City: {weatherData.name}</p>
                            <p>Country: {weatherData.sys.country}</p>
                            <p>Weather: {weatherData.weather[0].main}</p>
                        </>
                    )}
                </li> */}

                <li className="sidebar-bottom">
                    {weatherData && (
                        <>
                            <i class='bx bx-current-location icon'></i>
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
