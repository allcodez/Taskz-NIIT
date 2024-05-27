import React, { useState, useContext } from 'react';
import './main.css';
import SideBar from '../../components/sideBar/SideBar';
import DateArray from '../../components/task/DateArray';
import WeatherBar from '../../components/weather/WeatherBar'; // Import WeatherBar component
import { WeatherContext } from '../../../hooks/WeatherProvider'; // Import WeatherContext
import { CategoryContext } from '../../../hooks/CategoryContext';

export default function Main() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [translation, setTranslation] = useState(0);
    const { selectedCategory } = useContext(CategoryContext);

    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
        setTranslation(isSidebarClosed ? 0 : -251);
    };

    // Access weatherData from WeatherContext
    const { weatherData } = useContext(WeatherContext);

    return (
        <>
            <div className="layout-root" style={{ transform: `translateX(${translation}px)`, transition: 'transform 0.3s ease', overflowX: isSidebarClosed ? 'visible' : 'hidden' }}>
                <SideBar />
                <div className="main-layout">
                    <div className="control">
                        {isSidebarClosed ? (
                            <i onClick={toggleSidebar} className='bx bx-arrow-to-right'></i>
                        ) : (
                            <i onClick={toggleSidebar} className='bx bx-arrow-to-left'></i>
                        )}
                        <h3>
                            Today{' '}
                            <b>{selectedCategory && selectedCategory !== 'All'
                                ? `(${selectedCategory})`
                                : ''}
                            </b>
                        </h3>
                    </div>
                    <DateArray />
                </div>
            </div>
            <WeatherBar weatherData={weatherData} />
        </>

    );
}
