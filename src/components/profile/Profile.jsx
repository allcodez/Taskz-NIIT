import react, { useState, useEffect } from 'react'
import './profile.css'
import Email from './changeEmail/Email'
import Password from './changePassword/Password'
import DeleteAccount from './delateAcct/DeleteAccount'
import EmailPopup from './popUp/email/EmailPopup'
import DeletePopup from './popUp/deleteAccount/DeletePopup'
import { useNavigate } from 'react-router-dom';
import PasswordPopup from './popUp/password/PasswordPopup'

export default function Profile({ onClose }) {
    const [showEmailPopup, setShowEmailPopup] = useState(false)
    const [showDeletePopup, setShowDeletePopup] = useState(false)
    const [showPasswordPopup, setShowPasswordPopup] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [isEdited, setIsEdited] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve user data from session storage
        const userId = sessionStorage.getItem('userId')
        const storedFirstName = sessionStorage.getItem('userName')
        const storedLastName = sessionStorage.getItem('lastName')
        const storedEmail = sessionStorage.getItem('email')

        if (userId && storedFirstName && storedLastName && storedEmail) {
            setFirstName(storedFirstName)
            setLastName(storedLastName)
            setEmail(storedEmail)
        }
    }, [])

    const handleChnageEmail = () => {
        setShowEmailPopup(true)
    };

    const closeEmailPopup = () => {
        setShowEmailPopup(false)
    }

    const closeDeletePopup = () => {
        setShowDeletePopup(false)
    }

    const closePasswordPopup = () => {
        setShowPasswordPopup(false)
    }

    const handleDeleteAccount = () => {
        setShowDeletePopup(true)
    }

    const handlePasswordChange = () => {
        setShowPasswordPopup(true)
    }

    const handleLogot = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        navigate('/login');
    };

    const handleInputChange = (e, setter) => {
        setter(e.target.value)
        setIsEdited(true)
    }

    const handleSave = async () => {
        const userId = sessionStorage.getItem('userId')

        if (!userId) {
            console.error('User ID not found')
            return
        }

        try {
            const response = await fetch(`https://star-taskz-backend.onrender.com/star-taskz/api/user/update-names/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName }),
            })

            if (response.ok) {
                // Update session storage with new names
                sessionStorage.setItem('userName', firstName)
                sessionStorage.setItem('lastName', lastName)
                setIsEdited(false)
                alert('Names updated successfully')
            } else {
                alert('Failed to update names')
            }
        } catch (error) {
            console.error('Error updating names:', error)
            alert('An error occurred while updating names')
        }
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
                    <div className='profile-name-section'>
                        <div className='profile-name-section-content'>
                            <div className='profile-img'>
                                <div className='profile-img-conatiner'>
                                    <div className='profile-img-content'>
                                        <div className='profile-img-placeholder'>{firstName[0]}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='profile-name'>
                                <div>
                                    <label>
                                        First name
                                    </label>
                                    <div className="profile-focusable-within">
                                        <input 
                                            type="text" 
                                            value={firstName} 
                                            onChange={(e) => handleInputChange(e, setFirstName)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label>
                                        Last name
                                    </label>
                                    <div className="profile-focusable-within">
                                        <input 
                                            type="text" 
                                            value={lastName} 
                                            onChange={(e) => handleInputChange(e, setLastName)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='profile-img-title'>
                        <p>Add photo</p>
                        <button 
                            className={`change-email-button ${isEdited ? 'active' : ''}`} 
                            disabled={!isEdited}
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </div>

                    <div className="account-security">
                        Account security
                    </div>

                    <Email handleChnageEmail={handleChnageEmail} email={email} />
                    <Password handlePasswordChange={handlePasswordChange}/>
                    <DeleteAccount handleDeleteAccount={handleDeleteAccount}/>
                    <button className='user-logout' onClick={handleLogot}>
                        <i className='bx bx-log-out'></i>
                        <span>Logout</span>
                    </button>
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