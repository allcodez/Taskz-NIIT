import React from 'react'
import './integrationBoard.css'
import GoogleCalendar from '../../../asstes/icons/google-calendar.png'
import GitHub from '../../../asstes/icons/github.png'
import Notion from '../../../asstes/icons/notion.png'
import GoogleCalendarBoard from './googleCalendar/GoogleCalendarBoard'
import GithubBoard from './gitHub/GithubBoard'
import NotionBoard from './notion/NotionBoard'

export default function IntegrationBoard({ selectedPlatform }) {
    const renderContent = () => {
        switch (selectedPlatform) {
            case 'google-calendar':
                return (
                    <>
                        <GoogleCalendarBoard />
                    </>
                );
            case 'github':
                return (
                    <>
                        <GithubBoard/>
                    </>
                );
            case 'notion':
                return (
                    <>
                        <NotionBoard/>
                    </>
                );
            default:
                return (
                    <>

                        <div className='integration-board-body'>
                            <h2>Sync Tasks</h2>
                            <p>Get and Add task to other platform just with Star Taskz</p>
                        </div>
                        <div className='integration-board-platforms'>
                            <p>Platforms</p>
                            <div className='integration-board-platforms-content'>
                                <div className="integration-board-platforms-box">
                                    <img src={GoogleCalendar} alt="" />
                                </div>
                                <button>Add Calendar</button>
                            </div>

                            <div className='integration-board-platforms-content'>
                                <div className="integration-board-platforms-box">
                                    <img src={GitHub} alt="" />
                                </div>
                                <button>Add GitHub</button>
                            </div>

                            <div className='integration-board-platforms-content'>
                                <div className="integration-board-platforms-box">
                                    <img src={Notion} alt="" />
                                </div>
                                <button>Add Notion</button>
                            </div>

                        </div>
                    </>
                );
        }
    };

    return (
        <div className='integration-board-container'>
            <div className='integration-board-head'>
                <h3>Integrations</h3>
            </div>
            {renderContent()}
        </div>
    )
}