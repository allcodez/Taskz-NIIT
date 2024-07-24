import React from 'react';
import './deletePopup.css';

export default function DeletePopup({ closeDeletePopup }) {
    return (
        <div className="delete-popup-overlay">
            <div className="delete-popup-backdrop" onClick={closeDeletePopup}></div>
            <div role="dialog" tabIndex="0" className="delete-popup-dialog">
                <div className="delete-popup-dialog-inner">
                    <div className="delete-popup-dialog-content">
                        <div className="delete-popup-icon-wrapper">
                            <svg role="graphics-symbol" viewBox="0 0 24 24" className="delete-popup-exclamationMarkCircle">
                                <path d="M11.992 19.93a7.757 7.757 0 0 1-3.117-.633 8.14 8.14 0 0 1-2.578-1.742 8.316 8.316 0 0 1-1.742-2.578 7.758 7.758 0 0 1-.633-3.118c0-1.104.21-2.143.633-3.117a8.275 8.275 0 0 1 4.313-4.32 7.758 7.758 0 0 1 3.116-.633c1.11 0 2.151.211 3.125.633a8.25 8.25 0 0 1 2.579 1.75 8.156 8.156 0 0 1 1.75 2.57c.421.974.632 2.013.632 3.117s-.21 2.144-.633 3.118a8.25 8.25 0 0 1-4.328 4.32 7.757 7.757 0 0 1-3.117.633Zm0-1.594a6.36 6.36 0 0 0 2.524-.5 6.488 6.488 0 0 0 2.062-1.39 6.49 6.49 0 0 0 1.39-2.063c.334-.781.5-1.623.5-2.524 0-.896-.166-1.734-.5-2.515a6.468 6.468 0 0 0-3.46-3.461 6.362 6.362 0 0 0-2.524-.5c-.896 0-1.737.166-2.523.5a6.4 6.4 0 0 0-2.055 1.39 6.531 6.531 0 0 0-1.383 2.07c-.333.782-.5 1.62-.5 2.516 0 .901.167 1.743.5 2.524a6.554 6.554 0 0 0 1.383 2.062 6.398 6.398 0 0 0 4.586 1.89Zm0-5.18c-.453 0-.687-.229-.703-.687l-.11-3.797a.7.7 0 0 1 .212-.563.809.809 0 0 1 .586-.218.82.82 0 0 1 .593.226.68.68 0 0 1 .22.555l-.126 3.797c-.01.458-.234.687-.672.687Zm0 2.594a.956.956 0 0 1-.656-.242.814.814 0 0 1-.266-.617.79.79 0 0 1 .266-.61.94.94 0 0 1 .656-.25c.25 0 .464.081.64.242a.788.788 0 0 1 .274.618c0 .25-.09.455-.273.617a.935.935 0 0 1-.64.242Z"></path>
                            </svg>
                        </div>
                        <div className="delete-popup-dialog-header">Delete your entire account permanently?</div>
                        <div className="delete-popup-dialog-body">
                            This action cannot be undone. This will permanently delete your entire account. All task will be deleted, and you will be removed from all colaboration.
                        </div>
                    </div>
                    <div className="delete-popup-dialog-actions">
                        <div className="profile-focusable-within">
                            <input type="text" placeholder='ade.fahdagboola02@gmail.com'/>
                        </div>
                        <div className="delete-popup-delete-button" role="button" tabIndex="0">
                            Permanently delete account
                        </div>
                        <div className="delete-popup-cancel-button" role="button" tabIndex="0">
                            Cancel
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};