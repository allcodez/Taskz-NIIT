import react from 'react'
import GitHub from '../../../../asstes/icons/github.png'
import PlaceHolder from '../../../../asstes/icons/Code typing-bro.svg'

export default function GithubBoard() {
    const handleAddGitHub = () => {
        const clientId = 'Ov23litcrZXBSWvWQzHY';
        const redirectUri = 'YOUR_REDIRECT_URI'; // Where GitHub will redirect after authorization
        const scope = 'repo,user'; // Scopes you need for GitHub integration
    
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
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
        </>
    );
}