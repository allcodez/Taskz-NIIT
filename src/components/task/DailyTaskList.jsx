// DailyTaskList.jsx
import React, { useState, useEffect } from 'react';
import DailyList from './DailyList';
import useFetch from './useFetch';
import Category from './Category';

export default function DailyTaskList( { day } ) {
    const {data: tasks, isPending, error}= useFetch('http://localhost:4000/tasks')


    return (
        <div className="dailyList">
            {error && <div>{ error}</div>}
            {isPending && <div>Loading ...</div>}
            {tasks && <DailyList tasks={tasks} dayTitle={day.day} />}
            {/* {tasks &&<DailyList tasks={tasks.filter((blog) => blog.category === 'work')} dayTitle='Work Category'/>} */}
        </div>
    );
}

