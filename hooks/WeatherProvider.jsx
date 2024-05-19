import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [weatherData, setWeatherData] = useState({});
    const [selectedWeatherData, setSelectedWeatherData] = useState(null);
    const [weatherBarVisible, setWeatherBarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [location, setLocation] = useState(null);

    return (
        <WeatherContext.Provider value={{
            weatherData,
            setWeatherData,
            selectedWeatherData,
            setSelectedWeatherData,
            weatherBarVisible,
            setWeatherBarVisible,
            selectedDate,
            setSelectedDate,
            weatherIcon,
            setWeatherIcon,
            location,
            setLocation
        }}>
            {children}
        </WeatherContext.Provider>
    );
};
