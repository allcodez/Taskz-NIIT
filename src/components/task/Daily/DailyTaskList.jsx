// DailyTaskList.jsx
import React, { useState, useEffect } from 'react';
import DailyList from './DailyList';
import useFetch from '../../../../hooks/useFetch';
import './dailyList.css'

export default function DailyTaskList({ day, date }) {
    // const {data: tasks, isPending, error}= useFetch('http://localhost:4000/tasks')
    // const [data, setData] = useState(null);
    // const [isPending, setIsPending] = useState(true);
    // const [error, setError] = useState(null)
    const [tasks, setTasks] = useState([
        {
            id: 1,
            taskTitle: "Work on the project",
            time: "10:00",
            category: "work",
            subTask: "Pursue all the people in the school"
        },
        {
            id: 2,
            taskTitle: "Revise exam",
            time: "12:00",
            category: "work",
            subTask: "Pursue all the people in the school"
        },
        {
            id: 3,
            taskTitle: "Run tests on the project",
            time: "12:00",
            category: "personal",
            subTask: "Pursue all the people in the school"
        },
        {
            id: 4,
            taskTitle: "Run the project",
            time: "12:00",
            category: "personal",
            subTask: "Pursue all the people in the school"
        }
    ])


    // useEffect(() => {
    //     const abortController = new AbortController();
    //     const signal = abortController.signal;

    //     fetch( { signal })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw Error('Could not fetch the data for that resource');
    //             }
    //             return response.json();
    //         })
    //         .then(data => {
    //             setData(data);
    //             setIsPending(false);
    //             setError(null);
    //         })
    //         .catch(err => {
    //             if (err.name === 'AbortError') {
    //                 console.log('Fetch aborted');
    //             } else {
    //                 setError(err.message);
    //                 setIsPending(false);
    //             }
    //         });

    // Cleanup function to abort fetch on component unmount
    //     return () => abortController.abort();
    // }, []);



    return (
        <div className="dailyList">
            {/* {error && <div>{ error}</div>} */}
            {/* {isPending && <div>Loading ...</div>} */}
            <h2>{day}</h2> {/* Render the dayTitle */}
            <p className="dailyList-date">{date}</p>
            {tasks && <DailyList tasks={tasks} />}
            {/* {tasks &&<DailyList tasks={tasks.filter((blog) => blog.category === 'work')} dayTitle='Work Category'/>} */}
        </div>
    );
}

