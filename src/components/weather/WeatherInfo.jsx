import React from 'react';
import './weatherInfo.css'

const WeatherInfo = ({ weatherInfo }) => {
    const getIconUrl = (iconCode) => {
        return `https://openweathermap.org/img/wn/${iconCode}.png`;
    };

    // Check if weather info exists
    if (!weatherInfo) {
        return null;
    }

    // Map weather conditions to icon codes
    let iconCode = '';
    switch (weatherInfo.toLowerCase()) {
        case 'clear':
            iconCode = '01d';
            break;
        case 'clouds':
            iconCode = '02d';
            break;
        case 'rain':
            iconCode = '10d';
            break;
        case 'thunderstorm':
            iconCode = '11d';
            break;
        case 'snow':
            iconCode = '13d';
            break;
        case 'mist':
            iconCode = '50d';
            break;
        case 'drizzle':
            iconCode = '09d';
            break;
        case 'smoke':
            iconCode = '50d';
            break;
        case 'haze':
            iconCode = '50d';
            break;
        case 'dust':
            iconCode = '50d';
            break;
        case 'fog':
            iconCode = '50d';
            break;
        case 'sand':
            iconCode = '50d';
            break;
        case 'ash':
            iconCode = '50d';
            break;
        case 'squall':
            iconCode = '50d';
            break;
        case 'tornado':
            iconCode = '50d';
            break;
        default:
            // No matching condition found
            return null;
    }

    // Construct the icon URL
    const iconUrl = getIconUrl(iconCode);

    return (
        <img src={iconUrl} alt="Weather Icon" />
    );
};

export default WeatherInfo;
