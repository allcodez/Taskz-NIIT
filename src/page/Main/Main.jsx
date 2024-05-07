import React, { useState } from 'react';
import './main.css'; // Assuming you have a CSS file for styling
import SideBar from '../../components/sideBar/SideBar';
import DailyTaskList from '../../components/task/DailyTaskList';
import DateArray from '../../components/task/DateArray';

export default function Main() {
    const data = {
        currentDay
    }
    return(
        <>
            <div>
                <SideBar/>
                {/* <DailyTaskList/> */}
                <DateArray  />
            </div>

        </>
    )
}