import React, { useState } from 'react';
import './sideBar.css';
import Calendar from '../calendar/Calendar';
import Category from '../categories/Category';

export default function SideBar() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showCalendar, setShowCalendar] = useState(true);

    const menuLinks = [
        { icon: 'bx-bell', text: 'Notifications' },
        { icon: 'bx-bell', text: 'Notifications' },
        { icon: 'bx-bell', text: 'Notifications' },
        { icon: 'bx-bell', text: 'Notifications' },
        { icon: 'bx-bell', text: 'Notifications' },
        { icon: 'bx-bell', text: 'Notifications' },
        { icon: 'bx-bell', text: 'Notifications' },
        { icon: 'bx-bell', text: 'Notifications' },
        { icon: 'bx-bell', text: 'Notifications' },
    ];

    const categoriesData = [
        {
            name: 'Work',
            items: ['Item 1', 'Item 2', 'Item 3']
        },
        {
            name: 'Personal',
            items: ['Item A', 'Item B', 'Item C']
        }
    ];

    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
        setShowCalendar(!showCalendar)
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('dark'); // Toggle dark mode class on body
    };

    return (
        <nav className={isSidebarClosed ? "sidebar close" : "sidebar"}>
            <header>
                <div className="image-text">
                    <span className="image">
                        {/* <img src="logo.png" alt=""> */}
                    </span>
                    <div className="text logo-text">
                        <span className="name">Star Taskz</span>
                    </div>
                </div>
                <i className={`bx ${isSidebarClosed ? 'bx-chevron-right' : 'bx-chevron-left'} toggle`} onClick={toggleSidebar}></i>
            </header>

            <div className="menu-bar">
                {/* <li className="search-box" onClick={() => setIsSidebarClosed(false)}>
                        <i className='bx bx-search icon'></i>
                        <input type="text" placeholder="Search..." />
                    </li> */}
                <div className="menu-content" style={{ overflowY: "auto" }}>
                    {showCalendar && (
                        <Calendar />
                    )}

                    {/* Categories */}
                    <ul className="menu-links">
                        <div className="menu-title">
                            <hr />
                            CATEGORIES
                        </div>
                        {categoriesData.map((category, index) => (
                            <Category key={index} category={category} />
                        ))}
                    </ul>
                </div>
            </div>

            <div className="bottom-content">
                <li className=" sidebar-bottom">
                    <a href="#">
                        <i className='bx bx-log-out icon'></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>
                <li className="mode sidebar-bottom" onClick={toggleDarkMode}>
                    <div className="sun-moon">
                        <i className={`bx bx-moon icon ${isDarkMode ? 'moon' : 'sun'}`}></i>
                        <i className={`bx bx-sun icon ${isDarkMode ? 'sun' : 'moon'}`}></i>
                    </div>
                    <span className="mode-text text">{isDarkMode ? 'Light mode' : 'Dark mode'}</span>
                    <div className="toggle-switch">
                        <span className="switch"></span>
                    </div>
                </li>
            </div>
        </nav>
    );
}
