import React, { useState, useContext, useEffect } from 'react';
import './main.css';
import SideBar from '../../components/sideBar/SideBar';
import DateArray from '../../components/task/DateArray';
import WeatherBar from '../../components/weather/WeatherBar';
import { WeatherContext } from '../../../hooks/WeatherProvider';
import { CategoryContext } from '../../../hooks/CategoryContext';
import { DateContext } from '../../../hooks/DateContext';
import StatusFilter from '../../components/statusFilter/StatusFilter';
import Profile from '../../components/profile/Profile';
import Integration from '../../components/integrations/Integration';
import IntegrationBoard from '../../components/integrations/integrationBoard/IntegrationBoard';

export default function Main() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [translation, setTranslation] = useState(0);
    const { selectedCategory } = useContext(CategoryContext);
    const { weatherData } = useContext(WeatherContext);
    const { selectedDate } = useContext(DateContext);
    const [filterStatus, setFilterStatus] = useState('All');
    const [dateDisplay, setDateDisplay] = useState('Today');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isIntegrationBoardOpen, setIsIntegrationBoardOpen] = useState(true);
    const [selectedPlatform, setSelectedPlatform] = useState(null);

    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
        setTranslation(isSidebarClosed ? 0 : -230);
    };

    useEffect(() => {
        if (selectedDate) {
            const today = new Date();
            if (selectedDate.toDateString() === today.toDateString()) {
                setDateDisplay('Today');
            } else {
                setDateDisplay(selectedDate.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric'
                }));
            }
        }
    }, [selectedDate]);

    const handleProfile = () => {
        setIsProfileOpen(true);
    };

    const closeProfile = () => {
        setIsProfileOpen(false);
    };

    const handleIntegrationToggle = () => {
        setIsIntegrationBoardOpen(!isIntegrationBoardOpen);
    };

    const handlePlatformSelect = (platform) => {
        setSelectedPlatform(platform);
        setIsIntegrationBoardOpen(false);
        // if (!isIntegrationBoardOpen) {
        //     setIsIntegrationBoardOpen(true);
        // }
    };

    return (
        <>
            <div
                className="layout-root"
                style={{
                    transform: `translateX(${translation}px)`,
                    transition: 'transform 0.3s ease',
                    overflowX: isSidebarClosed ? 'visible' : 'hidden',
                }}
            >
                <SideBar />
                <div className="main-layout">
                    <div className="control">
                        <div className="control-item">
                            {isSidebarClosed ? (
                                <i onClick={toggleSidebar} className="bx bx-arrow-to-right"></i>
                            ) : (
                                <i onClick={toggleSidebar} className="bx bx-arrow-to-left"></i>
                            )}
                            <h3>
                                {dateDisplay}{' '}
                                <b>{selectedCategory && selectedCategory !== 'All' ? `(${selectedCategory})` : ''}</b>
                            </h3>
                        </div>
                    </div>
                    <DateArray
                        filterStatus={filterStatus}
                        setFilterStatus={setFilterStatus}
                    />
                </div>
            </div>
            <WeatherBar weatherData={weatherData} />
            <div className="status-filter">
                <StatusFilter
                    filterStatus={filterStatus}
                    setFilterStatus={setFilterStatus}
                />
            </div>
            <div className='manage-integration'>
                <Integration 
                    onToggle={handleIntegrationToggle}
                    onSelectPlatform={handlePlatformSelect}
                    isIntegrationBoardOpen={isIntegrationBoardOpen}
                />
            </div>
            <div className={`integration-board-position ${isIntegrationBoardOpen ? 'open' : ''}`}>
                <IntegrationBoard selectedPlatform={selectedPlatform} />
            </div>
            <div className='main-account' onClick={handleProfile}>
                <span>A</span>
            </div>
            {isProfileOpen && <Profile onClose={closeProfile} />}
        </>
    );
}
