import react from 'react'

export default function Passowd({ handlePasswordChange }) {
    return (
        <div className="email-section">
            <div className="email-details">
                <div className="email-label">
                    <div>Password</div>
                </div>
                <div className="email-address">
                    <p>Set a new password</p>
                </div>
            </div>
            <div
                role="button"
                tabIndex="0"
                className="change-email-button"
                onClick={handlePasswordChange}
            >
                Change password
            </div>
        </div>
    )
}