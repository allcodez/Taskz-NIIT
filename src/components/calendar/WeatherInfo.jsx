import React from 'react';
import './weatherInfo.css'

const WeatherInfo = ({ weatherInfo }) => {
    const getIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    };

    // Check if weather info exists
    if (!weatherInfo) {
        return null;
    }

    // Assuming your weatherInfo prop contains the main weather condition
    // You can modify this logic based on your actual data structure
    let iconCode = '';
    switch (weatherInfo.toLowerCase()) {
        case 'clear':
            iconCode = '01';
            break;
        case 'clouds':
            iconCode = '02';
            break;
        case 'rain':
            iconCode = '10';
            break;
        case 'thunderstorm':
            iconCode = '11';
            break;
        case 'snow':
            iconCode = '13';
            break;
        case 'mist':
            iconCode = '50';
            break;
        default:
            iconCode = '';
    }

    // If no matching weather condition found, return null
    if (!iconCode) {
        return null;
    }

    // Construct the icon URL
    const iconUrl = getIconUrl(`${iconCode}d`); // Assuming day icon is used

    return (
        <div className="weather-info">
                    <img src={iconUrl} alt="Weather Icon" />
            </div>
    );
};

export default WeatherInfo;
