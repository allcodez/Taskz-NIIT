// DailyTaskList.jsx
import React, { useState, useEffect } from 'react';
import DailyList from './DailyList';
import useFetch from './useFetch';

export default function DailyTaskList() {
    const {data: tasks, isPending, error}= useFetch('http://localhost:8000/tasks')


    return (
        <div className="dailyList">
            {error && <div>{ error}</div>}
            {isPending && <div>Loading ...</div>}
            {tasks && <DailyList tasks={tasks} dayTitle='Monday' />}
            {tasks &&<DailyList tasks={tasks.filter((blog) => blog.category === 'work')} dayTitle='Work Category'/>}
        </div>
    );
}

