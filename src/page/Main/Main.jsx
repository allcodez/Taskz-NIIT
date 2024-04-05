import React, { useState } from 'react';
import './main.css'; // Assuming you have a CSS file for styling

export default function Main() {
    const [isSidebarClosed, setIsSidebarClosed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    // const menuLinks = [
    //     { icon: 'bx-home-alt', text: 'Dashboard' },
    //     { icon: 'bx-bar-chart-alt-2', text: 'Revenue' },
    //     { icon: 'bx-bell', text: 'Notifications' },
    //     { icon: 'bx-pie-chart-alt', text: 'Analytics' },
    //     { icon: 'bx-heart', text: 'Likes' },
    //     { icon: 'bx-wallet', text: 'Wallets' }
    // ];

    const toggleSidebar = () => {
        setIsSidebarClosed(!isSidebarClosed);
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
                        <span className="profession">Task Manager</span>
                    </div>
                </div>
                <i className={`bx ${isSidebarClosed ? 'bx-chevron-right' : 'bx-chevron-left'} toggle`} onClick={toggleSidebar}></i>
            </header>
            <div className="menu-bar">
                <div className="menu">
                    {/* <li className="search-box" onClick={() => setIsSidebarClosed(false)}>
                        <i className='bx bx-search icon'></i>
                        <input type="text" placeholder="Search..." />
                    </li> */}
                    <ul className="menu-links">
                        {/* {menuLinks.map((link, index) => (
                            <li className="nav-link" key={index} onClick={() => setIsSidebarClosed(false)}>
                                <a href="#">
                                    <i className={`bx ${link.icon} icon`}></i>
                                    <span className="text nav-text">{link.text}</span>
                                </a>
                            </li>
                        ))} */}
                    </ul>
                </div>
                <div className="bottom-content">
                    <li className="">
                        <a href="#">
                            <i className='bx bx-log-out icon'></i>
                            <span className="text nav-text">Logout</span>
                        </a>
                    </li>
                    <li className="mode" onClick={toggleDarkMode}>
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
            </div>
        </nav>
    );
}
