import React, { useState } from 'react'
import './form.css'
import Login from '../../components/Login'
import Signup from '../../components/Signup'

export default function Form() {
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    const handleSignUpClick = () => {
        setIsSignUpMode(true);
        console.log('SignUp Clicked')
    };

    const handleSignInClick = () => {
        setIsSignUpMode(false);
        console.log('Login Clicked')

    };

    return (
        <>
            <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <Login handleSignInClick={handleSignInClick} />
                        <Signup handleSignUpClick={handleSignUpClick} />
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                                ex ratione. Aliquid!
                            </p>
                            <button className="btn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                        <img src="img/log.svg" className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                                laboriosam ad deleniti.
                            </p>
                            <button className="btn transparent" id="sign-in-btn">
                                Sign in
                            </button>
                        </div>
                        <img src="img/register.svg" className="image" alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}