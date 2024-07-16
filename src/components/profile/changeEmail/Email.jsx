import react, {useState} from 'react'
import EmailPopup from '../popUp/email/EmailPopup';

export default function Email({handleChnageEmail}) {
    const [showEmailPopup, setShowEmailPopup] = useState(false)

    // const handleChnageEmail = () => {
    //     setShowEmailPopup(true)
    // };

    return (
        <div className="email-section">
            <div className="email-details">
                <div className="email-label">
                    <div>Email</div>
                </div>
                <div className="email-address">
                    <p>ade.fahdagboola02@gmail.com</p>
                </div>
            </div>
            <div
                role="button"
                tabIndex="0"
                className="change-email-button"
                onClick={handleChnageEmail}
            >
                Change email
            </div>
            
        </div>
    )
}