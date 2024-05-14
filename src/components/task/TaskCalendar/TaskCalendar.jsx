import React, { useState, useEffect } from 'react';

function TaskCalendar() {
    const [weatherData, setWeatherData] = useState({});
    const [weatherDataFetched, setWeatherDataFetched] = useState(false);

    const generateDatesForNextThreeMonths = () => {
        const today = new Date();
        const datesArray = [];

        // Add the current date to the array
        datesArray.push({
            date: new Date(today),
            day: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear(),
        });

        // Generate dates for the next 3 months
        for (let i = 1; i <= 90; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);
            datesArray.push({
                date: new Date(nextDate),
                day: nextDate.getDate(),
                month: nextDate.getMonth(),
                year: nextDate.getFullYear(),
            });
        }

        return datesArray;
    };

    const renderCalendar = () => {
        return generateDatesForNextThreeMonths();
    };

    // useEffect(() => {
    //     const fetchWeatherData = async () => {
    //         try {
    //             const datesArray = generateDatesForNextThreeMonths();
    //             const weatherDataForDates = {};

    //             for (const dateObj of datesArray) {
    //                 const date = dateObj.date;

    //                 // Retrieve latitude and longitude from local storage
    //                 const latitude = parseFloat(localStorage.getItem('latitude'));
    //                 const longitude = parseFloat(localStorage.getItem('longitude'));

    //                 const apiKey = 'e5883bae80f6bb5683f7e4a084f547fe';
    //                 const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}&dt=${Math.floor(date.getTime() / 1000)}`;

    //                 const response = await fetch(apiUrl);
    //                 if (response.ok) {
    //                     const data = await response.json();
    //                     weatherDataForDates[date.toDateString()] = data;
    //                     // console.log('Calendar', data);
    //                 } else {
    //                     console.error('Error fetching weather data:', response.statusText);
    //                 }
    //             }

    //             setWeatherData(weatherDataForDates);
    //             setWeatherDataFetched(true);
    //         } catch (error) {
    //             console.error('Error fetching weather data:', error);
    //         }
    //     };

    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             fetchWeatherData();
    //         },
    //         (error) => {
    //             console.error('Error getting location:', error);
    //             alert('Unable to get your location. Please allow location access for this feature.');
    //         }
    //     );
    // }, []);

    return renderCalendar();
}

export default TaskCalendar;