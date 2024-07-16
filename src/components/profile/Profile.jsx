import react, {useState} from 'react'
import './profile.css'
import Email from './changeEmail/Email'
import Password from './changePassword/Password'
import DeleteAccount from './delateAcct/DeleteAccount'
import EmailPopup from './popUp/email/EmailPopup'
import DeletePopup from './popUp/deleteAccount/DeletePopup'
import PasswordPopup from './popUp/password/PasswordPopup'

export default function Profile({ onClose }) {
    const [showEmailPopup, setShowEmailPopup] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [showPasswordPopup, setShowPasswordPopup] = useState(false)

    const handleChnageEmail = () => {
        setShowEmailPopup(true)
    };

    const closeEmailPopup = ()=>{
        setShowEmailPopup(false)
    }

    const closeDeletePopup = () =>{
        setShowDeletePopup(false)
    }

    const closePasswordPopup = () =>{
        setShowPasswordPopup(false)
    }

    const handleDeleteAccount = () =>{
        setShowDeletePopup(true)
    }

    const handlePasswordChange = () =>{
        setShowPasswordPopup(true)
    }


    return (
        <div className='profile-container'>
            <div onClick={onClose} className='profile-background'></div>
            <div className='profile-main'>


                <div className='profile-content'>
                    <div className='profile-content-head'>
                        <i onClick={onClose} className='bx bx-left-arrow-alt'></i>
                        <h3>My Profile</h3>

                    </div>
                    {/* <h3>My Profile</h3> */}
                    <div className='profile-name-section'>
                        <div className='profile-name-section-content'>
                            <div className='profile-img'>
                                <div className='profile-img-conatiner'>
                                    <div className='profile-img-content'>
                                        <div className='profile-img-placeholder'>A</div>
                                    </div>
                                </div>
                            </div>
                            <div className='profile-name'>
                                <div>
                                    <label>
                                        First name
                                    </label>
                                    <div className="profile-focusable-within">
                                        <input type="text" />
                                    </div>
                                </div>
                                <div>
                                    <label>
                                        Last name
                                    </label>
                                    <div className="profile-focusable-within">
                                        <input type="text" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='profile-img-title'>
                        <p>Add photo</p>
                        <button className='change-email-button' disabled>Save</button>
                    </div>

                    <div className="account-security">
                        Account security
                    </div>

                    <Email handleChnageEmail={handleChnageEmail} />
                    <Password handlePasswordChange={handlePasswordChange}/>
                    <DeleteAccount handleDeleteAccount={handleDeleteAccount}/>

                </div>

            </div>

            {showEmailPopup && (
                <EmailPopup closeEmailPopup={closeEmailPopup}/>
            )}
            {showDeletePopup && (
                <DeletePopup closeDeletePopup={closeDeletePopup}/>
            )}
            {showPasswordPopup && (
                <PasswordPopup closePasswordPopup={closePasswordPopup}/>
            )}
        </div>
    )
}
