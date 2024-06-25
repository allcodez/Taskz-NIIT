import React, { useState, useEffect } from 'react';

function TaskCalendar() {
    const [weatherData, setWeatherData] = useState({});
    const [weatherDataFetched, setWeatherDataFetched] = useState(false);

    const generateDatesForSixMonths = () => {
        const today = new Date();
        const datesArray = [];

        // Generate dates for the past 3 months
        for (let i = -90; i < 0; i++) {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() + i);
            datesArray.push({
                date: new Date(pastDate),
                day: pastDate.getDate(),
                month: pastDate.getMonth(),
                year: pastDate.getFullYear(),
            });
        }

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
        return generateDatesForSixMonths();
    };

    return renderCalendar();
}

export default TaskCalendar;