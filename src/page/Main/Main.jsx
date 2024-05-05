import React, { useState } from 'react';
import './main.css'; // Assuming you have a CSS file for styling
import SideBar from '../../components/sideBar/SideBar';
import DailyTaskList from '../../components/task/DailyTaskList';

export default function Main() {
    return(
        <>
            <div>
                <SideBar/>
                <DailyTaskList/>
            </div>

        </>
    )
}