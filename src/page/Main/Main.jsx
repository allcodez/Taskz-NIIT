import React, { useState } from 'react';
import './main.css'; // Assuming you have a CSS file for styling
import SideBar from '../../components/sideBar/SideBar';
import TaskContainer from '../../components/task/TaskContainer';

export default function Main() {
    return(
        <>
            <div>
                <SideBar/>
                <TaskContainer/>
            </div>

        </>
    )
}