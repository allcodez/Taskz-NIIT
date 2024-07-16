import react from 'react'

export default function DeleteAccount({ handleDeleteAccount }) {
    return (
        <div className="email-section profile-delete">
            <div className="email-details">
                <div className="email-label">
                    <div className="profile-delete-head">Delete my account</div>
                </div>
                <div className="email-address">
                    <p>Permanently delete the account and remove access from all workspaces.</p>
                </div>
            </div>
            <div
                role="button"
                tabIndex="0"
                className="profile-delete-button change-email-button"
                onClick={handleDeleteAccount}
            >
                Delete Account
            </div>
        </div>
    )
}