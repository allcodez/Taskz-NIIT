import React from 'react';
import './integration.css';
import GoogleCalendar from '../../asstes/icons/google-calendar.png';
import GitHub from '../../asstes/icons/github.png';
import Notion from '../../asstes/icons/notion.png';

export default function Integration({ onToggle, onSelectPlatform, isIntegrationBoardOpen }) {
    const handleToggle = () => {
        onToggle();
    };

    const handlePlatformSelect = (platform) => {
        onSelectPlatform(platform);
    };

    return (
        <div className='integration-container'>
            <div className="integration-container-control" onClick={handleToggle}>
                <i className={`bx ${isIntegrationBoardOpen ? 'bxs-chevrons-left' : 'bxs-chevrons-right'}`}></i>
            </div>
            <div className='integrations'>
                <div className='integration-box' onClick={(e) => {
                    e.stopPropagation();
                    handlePlatformSelect('google-calendar');
                }}>
                    <img src={GoogleCalendar} alt="Google Calendar" />
                </div>
                {/* <div className='integration-box' onClick={(e) => {
                    e.stopPropagation();
                    handlePlatformSelect('github');
                }}>
                    <img src={GitHub} alt="GitHub" />
                </div>
                <div className='integration-box' onClick={(e) => {
                    e.stopPropagation();
                    handlePlatformSelect('notion');
                }}>
                    <img src={Notion} alt="Notion" />
                </div> */}
            </div>
        </div>
    );
}
