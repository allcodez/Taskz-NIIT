// DateArray.jsx
import React, { useEffect } from 'react';
import useFetch from './useFetch';
import './dateArray.css';
import DailyTaskList from './DailyTaskList';

export default function DateArray() {
    const { data: dates, isPending, error } = useFetch('http://localhost:7000/dates');

    useEffect(() => {
        console.log('error', error);
    }, [dates]);

    return (
        <div className="dateArray">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {dates && <DayList days={dates} />}
        </div>
    );
}

function DayList({ days }) {
    return (
        <div className="dayList">
            {days.map((day, index) => (
                <div key={index}>
                    {/* <p>{day.day}</p> */}
                    <DailyTaskList day={day} />
                </div>
            ))}
        </div>
    );
}
