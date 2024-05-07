import React, { useState } from 'react';
import './main.css'; // Assuming you have a CSS file for styling
import SideBar from '../../components/sideBar/SideBar';
import DailyTaskList from '../../components/task/Daily/DailyTaskList';
import DateArray from '../../components/task/DateArray';
// import TaskContainer from '../../components/_task/TaskContainer';

export default function Main() {
    const [sideBarLoaded, setSideBarLoaded] = useState(false);
    const [dailyTaskListLoaded, setDailyTaskListLoaded] = useState(false);

    // Function to handle when the SideBar component has finished loading
    const handleSideBarLoad = () => {
        setSideBarLoaded(true);
    };

    // Function to handle when the DailyTaskList component has finished loading
    const handleDailyTaskListLoad = () => {
        setDailyTaskListLoaded(true);
    };

    return (
        <>
            <div>
                <SideBar onLoad={handleSideBarLoad} />
                {/* Only render DateArray if both SideBar and DailyTaskList have finished loading */}
                {sideBarLoaded && <DateArray />}
                {/* Uncomment below if you want to render DailyTaskList */}
                {/* <DailyTaskList onLoad={handleDailyTaskListLoad} /> */}
            </div>
        </>
    );
}
