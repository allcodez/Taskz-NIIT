import React, { useState } from 'react';
import './main.css'; // Assuming you have a CSS file for styling
import SideBar from '../../components/sideBar/SideBar';
import DailyTaskList from '../../components/task/Daily/DailyTaskList';
import DateArray from '../../components/task/DateArray';
// import TaskContainer from '../../components/_task/TaskContainer';

export default function Main() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [translation, setTranslation] = useState(0);

    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
        setTranslation(isSidebarClosed ? 0 : -248);
    };

    return (
        <>
            <div className="layout-root" style={{ transform: `translateX(${translation}px)`, transition: 'transform 0.3s ease' }}>
                <SideBar />
                {/* <DailyTaskList/> */}
                <div className="main-layout">
                    <div className="control">
                        <p>Heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy</p>
                        <button onClick={toggleSidebar}>Click</button>
                    </div>
                    <DateArray />
                </div>
            </div>
        </>
    )
}
