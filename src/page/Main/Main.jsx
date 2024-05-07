import React, { useState } from 'react';
import './main.css'; // Assuming you have a CSS file for styling
import SideBar from '../../components/sideBar/SideBar';
import DailyTaskList from '../../components/task/DailyTaskList';
import DateArray from '../../components/task/DateArray';
import TaskContainer from '../../components/_task/TaskContainer';

export default function Main() {
    const data = {
        currentDay
    }
    return(
        <>
            <div>
                <SideBar/>
                <DateArray />
                <TaskContainer/>
            </div>

        </>
    )
}