import React from 'react';
import './emailPopup.css';

export default function EmailPopup({ closeEmailPopup }) {
    return (
        <div className="email-popup-overlay">
            <div className="email-popup-backdrop" onClick={closeEmailPopup}></div>
            <div role="dialog" tabIndex="0" aria-label="Change email" className="email-popup-dialog">
                <div className="email-popup-dialog-content">
                    <p>
                        Your current email is <span className="email-popup-email">ade.fahdagboola02@gmail.com</span>.
                    </p>
                    <form action="" className='email-popup-dialog-form'>
                        <label>New Email</label>
                        <div className="profile-focusable-within">
                            <input type="text" />
                        </div>
                    </form>
                    <div role="button" tabIndex="0" className="email-popup-send-code-button">
                        Change Email
                    </div>
                </div>
            </div>
        </div>
    );
};