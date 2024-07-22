import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Notion from '../../../../asstes/icons/notion.png';
import PlaceHolder from '../../../../asstes/icons/Work in progress-bro.svg';

export default function NotionBoard() {
    const [isConnected, setIsConnected] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [databases, setDatabases] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const CLIENT_ID = 'd600d4e9-8987-49f0-8530-7aed02c7a859';
    const REDIRECT_URI = 'https://3000-idx-taskz-niit-1721589692518.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/star-taskz';
    const API_BASE_URL = 'https://api.notion.com/v1';

    useEffect(() => {
        console.log("Component mounted");
        checkForAuthCode();
    }, []);

    useEffect(() => {
        console.log("isConnected changed:", isConnected);
        if (isConnected) {
            fetchNotionData();
        }
    }, [isConnected]);

    const checkForAuthCode = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get('code');
        console.log("Checking for auth code:", authCode ? "Found" : "Not found");
        if (authCode) {
            await simulateServerExchange(authCode);
        } else {
            const storedToken = localStorage.getItem('notionAccessToken');
            console.log("Stored token:", storedToken ? "Found" : "Not found");
            if (storedToken) {
                setIsConnected(true);
            }
        }
    };

    const simulateServerExchange = async (code) => {
        console.log("Simulating server-side code exchange");
        // In a real application, this would be a call to your backend
        // Your backend would then securely exchange the code for a token
        // For this example, we'll just simulate a successful exchange
        const simulatedToken = `simulated_token_${code}`;
        localStorage.setItem('notionAccessToken', simulatedToken);
        setIsConnected(true);
    };

    const fetchNotionData = async () => {
        console.log("Fetching Notion data");
        setLoading(true);
        try {
            const accessToken = localStorage.getItem('notionAccessToken');
            if (!accessToken) {
                throw new Error("No access token found");
            }
            const headers = {
                'Authorization': `Bearer ${accessToken}`,
                'Notion-Version': '2022-06-28',
            };

            console.log("Fetching databases");
            const databasesResponse = await axios.post(`${API_BASE_URL}/search`, { 
                filter: { property: 'object', value: 'database' }
            }, { headers });
            console.log("Databases fetched:", databasesResponse.data);
            setDatabases(databasesResponse.data.results);

            if (databasesResponse.data.results.length > 0) {
                const firstDatabaseId = databasesResponse.data.results[0].id;
                console.log("Fetching tasks from database:", firstDatabaseId);
                const tasksResponse = await axios.post(`${API_BASE_URL}/databases/${firstDatabaseId}/query`, {}, { headers });
                console.log("Tasks fetched:", tasksResponse.data);
                setTasks(tasksResponse.data.results);
            } else {
                console.log("No databases found");
            }
        } catch (err) {
            console.error("Error fetching Notion data:", err);
            setError(`Failed to fetch data from Notion: ${err.message}`);
        }
        setLoading(false);
    };

    const handleConnect = () => {
        const authUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&owner=user&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
        console.log("Redirecting to Notion auth URL:", authUrl);
        window.location.href = authUrl;
    };

    return (
        <>
            <div className='integration-board-body'>
                <p>Notion</p>
                <p>Sync your Notion pages with star taskz</p>
                {!isConnected ? (
                    <button onClick={handleConnect}>
                        <img src={Notion} alt="Notion logo" />
                        <p>Add Notion</p>
                    </button>
                ) : (
                    <p>Connected to Notion</p>
                )}
            </div>
            <div className='integration-board-google-placeholder'>
                {loading ? (
                    <p>Loading Notion data...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : isConnected ? (
                    <div>
                        <h3>Your Notion Databases ({databases.length}):</h3>
                        <ul>
                            {databases.map(db => (
                                <li key={db.id}>{db.title[0]?.plain_text || 'Untitled'}</li>
                            ))}
                        </ul>
                        <h3>Tasks from First Database ({tasks.length}):</h3>
                        <ul>
                            {tasks.map(task => (
                                <li key={task.id}>{task.properties.Name?.title[0]?.plain_text || 'Untitled Task'}</li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <img src={PlaceHolder} alt="Work in progress" />
                )}
            </div>
        </>
    );
}