import react, {useState, useEffect} from 'react'
import GitHub from '../../../../asstes/icons/github.png'
import PlaceHolder from '../../../../asstes/icons/Code typing-bro.svg'

export default function GithubBoard() {
    const [repos, setRepos] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleAddGitHub = () => {
        const clientId = 'Ov23litcrZXBSWvWQzHY';
        const redirectUri = 'https://3000-idx-taskz-niit-1721589692518.cluster-rcyheetymngt4qx5fpswua3ry4.cloudworkstations.dev/star-taskz'; // Replace with your app URL
        const scope = 'repo,user';

        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            fetchAccessToken(code);
        }
    }, []);

    const fetchAccessToken = async (code) => {
        try {
            const response = await fetch('https://3001-monospace-taskz-niit-1714042149044.cluster-y34ecccqenfhcuavp7vbnxv7zk.cloudworkstations.dev/star-taskz/access_token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            });
            const data = await response.json();

            if (data.access_token) {
                setIsAuthenticated(true);
                fetchRepositories(data.access_token);
            }
        } catch (error) {
            console.error('Error fetching access token:', error);
        }
    };

    const fetchRepositories = async (token) => {
        try {
            const response = await fetch('/api/github/repositories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token })
            });
            const data = await response.json();
            setRepos(data);
        } catch (error) {
            console.error('Error fetching repositories:', error);
        }
    };

    return (
        <>
            <div className='integration-board-body'>
                <p>GitHub</p>
                <p>Sync your GitHub issues and pull requests to star taskz</p>
                <button onClick={handleAddGitHub}>
                    <img src={GitHub} alt="GitHub Icon" />
                    <p>Add GitHub</p>
                </button>
            </div>
            <div className='integration-board-google-placeholder'>
                <img src={PlaceHolder} alt="" />
            </div>
            {isAuthenticated && (
                <div className='repo-list'>
                    <h2>Your Repositories</h2>
                    <ul>
                        {repos.length > 0 ? (
                            repos.map(repo => (
                                <li key={repo.id}>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                                        {repo.name}
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li>No repositories found.</li>
                        )}
                    </ul>
                </div>
            )}
        </>
    );
}