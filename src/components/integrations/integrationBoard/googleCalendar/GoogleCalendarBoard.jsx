import react, {useState, useEffect} from 'react'
import GoogleCalendar from '../../../../asstes/icons/google-calendar.png'
import PlaceHolder from '../../../../asstes/icons/Calendar-bro.svg'
import { loadGapi, signIn, isSignedIn, getCurrentUser } from '../../../../../auth/googleAuth';

export default function GoogleCalendarBoard() {
    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        loadGapi().then(() => {
            setSignedIn(isSignedIn());
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(setSignedIn);
        });
    }, []);

    const handleAddCalendarClick = () => {
        signIn().then(() => {
            if (isSignedIn()) {
                const user = getCurrentUser();
                console.log('Signed in as:', user.getBasicProfile().getName());
                // You can now use the Google Calendar API with the authenticated user
            }
        }).catch((error) => {
            console.error('Error signing in', error);
        });
    };

    return (
        <>
            <div className='integration-board-body'>
                <p>Google Calendar</p>
                <p>Sync your events and tasks from Google Calendar to Star Taskz</p>
                <button onClick={handleAddCalendarClick}>
                    <img src={GoogleCalendar} alt="" />
                    <p>Add Calendar</p>
                </button>
            </div>
            <div className='integration-board-google-placeholder'>
                <img src={PlaceHolder} alt="" />
            </div>
        </>
    );
}