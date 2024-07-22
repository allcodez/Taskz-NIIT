import React, { useState, useEffect, useCallback } from 'react';
import GoogleCalendar from '../../../../asstes/icons/google-calendar.png';
import PlaceHolder from '../../../../asstes/icons/Calendar-bro.svg';
import './googleCalendarBoard.css'

// TODO: Move these to environment variables
// Define your environment variables here
const ENV = {
    REACT_APP_CLIENT_ID: '173173126639-9e95hlhq8mdfpcltu92klvo1bcas8amp.apps.googleusercontent.com',
    REACT_APP_API_KEY: 'AIzaSyBzFocV25RdyPic-lREBLInVJX3dO1f_ng',
    REACT_APP_DISCOVERY_DOC: 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
    REACT_APP_SCOPES: 'https://www.googleapis.com/auth/calendar.readonly'
};

// Use the ENV object to access your variables
const CLIENT_ID = ENV.REACT_APP_CLIENT_ID;
const API_KEY = ENV.REACT_APP_API_KEY;
const DISCOVERY_DOC = ENV.REACT_APP_DISCOVERY_DOC;
const SCOPES = ENV.REACT_APP_SCOPES;

export default function GoogleCalendarBoard() {
    const [gapiInited, setGapiInited] = useState(false);
    const [gisInited, setGisInited] = useState(false);
    const [tokenClient, setTokenClient] = useState(null);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState(null);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [currentDay, setCurrentDay] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    const gapiLoaded = useCallback(() => {
        window.gapi.load('client', initializeGapiClient);
    }, []);

    const gisLoaded = useCallback(() => {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
            client_id: CLIENT_ID,
            scope: SCOPES,
            callback: handleTokenResponse,
        });
        setTokenClient(tokenClient);
        setGisInited(true);
    }, []);

    const initializeGapiClient = useCallback(async () => {
        try {
            await window.gapi.client.init({
                apiKey: API_KEY,
                discoveryDocs: [DISCOVERY_DOC],
            });
            setGapiInited(true);

            const storedToken = localStorage.getItem('gapi_token');
            if (storedToken) {
                window.gapi.client.setToken(JSON.parse(storedToken));
                setIsSignedIn(true);
                listUpcomingEvents();
            }
        } catch (err) {
            setError(`Error initializing GAPI client: ${err.message}`);
        }
    }, []);

    useEffect(() => {
        const loadGapiAndGsi = () => {
            const gapiScript = document.createElement('script');
            gapiScript.src = 'https://apis.google.com/js/api.js';
            gapiScript.async = true;
            gapiScript.defer = true;
            gapiScript.onload = gapiLoaded;
            document.body.appendChild(gapiScript);

            const gsiScript = document.createElement('script');
            gsiScript.src = 'https://accounts.google.com/gsi/client';
            gsiScript.async = true;
            gsiScript.defer = true;
            gsiScript.onload = gisLoaded;
            document.body.appendChild(gsiScript);

            return () => {
                document.body.removeChild(gapiScript);
                document.body.removeChild(gsiScript);
            };
        };

        loadGapiAndGsi();

        updateCurrentDateAndDay();
        const intervalId = setInterval(updateCurrentDateAndDay, 60000);

        return () => clearInterval(intervalId);
    }, [gapiLoaded, gisLoaded]);

    const handleTokenResponse = useCallback(async (resp) => {
        if (resp.error !== undefined) {
            setError(`Error during authentication: ${resp.error}`);
            return;
        }

        localStorage.setItem('gapi_token', JSON.stringify(resp));
        setIsSignedIn(true);
        await listUpcomingEvents();
    }, []);

    const handleAuthClick = useCallback(() => {
        if (!tokenClient) return;

        if (window.gapi.client.getToken() === null) {
            tokenClient.requestAccessToken({ prompt: 'consent' });
        } else {
            tokenClient.requestAccessToken({ prompt: '' });
        }
    }, [tokenClient]);

    const handleSignoutClick = useCallback(() => {
        const token = window.gapi.client.getToken();
        if (token !== null) {
            window.google.accounts.oauth2.revoke(token.access_token, () => {
                window.gapi.client.setToken('');
                localStorage.removeItem('gapi_token');
                setIsSignedIn(false);
                setEvents([]);
            });
        }
    }, []);

    const listUpcomingEvents = async () => {
        try {
            const request = {
                'calendarId': 'primary',
                'timeMin': (new Date()).toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                'maxResults': 10,
                'orderBy': 'startTime',
            };
            const response = await window.gapi.client.calendar.events.list(request);
            setEvents(response.result.items);
            setError(null);
        } catch (err) {
            setError(`Error fetching events: ${err.message}`);
        }
    };

    const updateCurrentDateAndDay = () => {
        const now = new Date();
        const dayOptions = { weekday: 'long' };
        const dateOptions = { day: 'numeric' };

        setCurrentDay(now.toLocaleDateString('en-US', dayOptions));
        setCurrentDate(now.toLocaleDateString('en-US', dateOptions));
    };

    const formatEventTime = (dateTimeString) => {
        const date = new Date(dateTimeString);
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    };

    return (
        <>
            {!isSignedIn && (
                <div className='integration-board-body'>
                    <p>Google Calendar</p>
                    <p>Sync your events and tasks from Google Calendar to Star Taskz</p>
                    {gapiInited && gisInited ? (
                        isSignedIn ? (
                            <button onClick={handleSignoutClick}>Sign Out</button>
                        ) : (
                            <button onClick={handleAuthClick}>
                                <img src={GoogleCalendar} alt="" />
                                <p>Add Calendar</p>
                            </button>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            )}
            <div className={isSignedIn ? 'integration-board-google-events' : 'integration-board-google-placeholder'}>
                {error && <p className="error">{error}</p>}
                {isSignedIn ? (
                    <div>
                        <div className='integration-board-google-events-head'>
                            <p>Upcoming Events</p>
                        </div>
                        <h3>{currentDay}</h3>
                        <h1>{currentDate}</h1>
                        <ul>
                            {events.length === 0 ? (
                                <li>No events for today</li>
                            ) : (
                                events.map(event => (
                                    <li key={event.id}>
                                        <div>
                                            <p>{event.summary}</p>
                                            <p>{formatEventTime(event.start.dateTime || event.start.date)}</p>
                                        </div>
                                        <button>
                                            <i className='bx bx-plus'></i>
                                        </button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                ) : (
                    <img src={PlaceHolder} alt="" />
                )}
            </div>
        </>
    );
}