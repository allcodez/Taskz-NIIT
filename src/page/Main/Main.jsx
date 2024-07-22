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
import Workspace from '../../components/workspace/Workspace';
import AddWorkSpace from '../../components/workspace/addWorkSpsace/AddWorkSpace';

export default function Main() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [translation, setTranslation] = useState(0);
    const { selectedCategory } = useContext(CategoryContext);
    const { weatherData } = useContext(WeatherContext);
    const { selectedDate, setSelectedDate } = useContext(DateContext);
    const [filterStatus, setFilterStatus] = useState('All');
    const [dateDisplay, setDateDisplay] = useState('Today');
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isIntegrationBoardOpen, setIsIntegrationBoardOpen] = useState(true);
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [showWorkspace, setShowWorkspace] = useState(() => {
        const savedWorkspaceView = localStorage.getItem('showWorkspace');
        return savedWorkspaceView ? JSON.parse(savedWorkspaceView) : false;
    });
    const [showAddWorkspacePopup, setShowAddWorkspacePopup] = useState(false);
    const [workspaces, setWorkspaces] = useState([]);

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

    const handleWorkspaceClick = () => {
        setShowWorkspace(!showWorkspace);
    };

    useEffect(() => {
        localStorage.setItem('showWorkspace', JSON.stringify(showWorkspace));
    }, [showWorkspace]);

    const handleDateDisplayClick = () => {
        if (showWorkspace) {
            setShowWorkspace(false);
            // Reset to today's date when switching back to DateArray
            setSelectedDate(new Date());
        }
    };

    const mainContentStyle = {
        width: isSidebarClosed ? '100%' : 'calc(100% - 230px)',
        transition: 'width 0.3s ease',
    };

    const handleCreateWorkspace = () => {
        setShowAddWorkspacePopup(true);
    };

    const handleCloseAddWorkspacePopup = () => {
        setShowAddWorkspacePopup(false);
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
                <SideBar  onWorkspaceClick={handleWorkspaceClick} 
                    isWorkspaceActive={showWorkspace}  />
                <div className="main-layout" style={mainContentStyle}>
                    <div className="control">
                        <div className="control-item">
                            {isSidebarClosed ? (
                                <i onClick={toggleSidebar} className="bx bx-arrow-to-right"></i>
                            ) : (
                                <i onClick={toggleSidebar} className="bx bx-arrow-to-left"></i>
                            )}
                            <h3 onClick={handleDateDisplayClick}>
                                {showWorkspace ? 'Back Home' : dateDisplay}{' '}
                                <b>{selectedCategory && selectedCategory !== 'All' ? `(${selectedCategory})` : ''}</b>
                            </h3>
                        </div>
                    </div>
                    {showWorkspace ? (
                        <Workspace
                            workspaces={workspaces}
                            onCreateWorkspace={handleCreateWorkspace}
                        />
                    ) : (
                        <DateArray
                            filterStatus={filterStatus}
                            setFilterStatus={setFilterStatus}
                        />
                    )}
                </div>
            </div>
            <WeatherBar weatherData={weatherData} />
            {!showWorkspace && (
                <div className="status-filter">
                    <StatusFilter
                        filterStatus={filterStatus}
                        setFilterStatus={setFilterStatus}
                    />
                </div>
            )}
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
            {showAddWorkspacePopup && (
                <AddWorkSpace
                    onClose={handleCloseAddWorkspacePopup}
                    // onSubmit={handleSubmitWorkspace}
                />
            )}
        </>
    );
}
