import React, { useState } from 'react';
import './main.css'; // Assuming you have a CSS file for styling
import SideBar from '../../components/sideBar/SideBar';
// import DailyTaskList from '../../components/task/Daily/DailyTaskList';
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
                        {isSidebarClosed ? (
                            <i onClick={toggleSidebar} className='bx bx-arrow-to-right'></i>
                        ) : (
                            <i onClick={toggleSidebar} className='bx bx-arrow-to-left'></i>
                        )}
                        <h3>Today</h3>
                    </div>
                    <DateArray />
                </div>
            </div>
        </>
    )
}
