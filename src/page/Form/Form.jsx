import React, { useState, useEffect } from 'react';
import './form.css'; // Import CSS file if you have one
import google from '../../asstes/images/google.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Slider from '../../components/slider/Slider';

export default function Form() {
    const [rigthSlider, setRightSlider] = useState(false);
    const [animeSlider, setAnimeSlider] = useState(false);
    const [showData1, setShowData1] = useState(true);
    const [showData2, setShowData2] = useState(false);
    const [showData3, setShowData3] = useState(false);
    const [showHeading, setShowHeading] = useState(true);
    const [showSignupForm, setShowSignupForm] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(window.innerWidth > 1000);
    const [hideSlider, setHideSlider] = useState(false)

    const handleLoginHereClick = () => {
        setAnimeSlider(true)
        setHideSlider(true)
        setTimeout(() => {
            setRightSlider(true);
            console.log('login');
        }, 700);

        setTimeout(() => {
            setHideSlider(false)
        }, 1000);

        if (window.innerWidth < 1000) {
            setShowSignupForm(false)
            setShowLoginForm(true)
        }
    };

    const SignupHereClick = () => {
        setAnimeSlider(false)
        setHideSlider(true)
        setTimeout(() => {
            setRightSlider(false);
        }, 700)
        console.log('signup')

        setTimeout(() => {
            setHideSlider(false)
        }, 1000);

        if (window.innerWidth < 1000) {
            setShowSignupForm(true)
            setShowLoginForm(false)
        }
    }

    const handleNext = () => {
        setShowHeading(false)
        setShowData1(false)
        setShowData2(true)
        setShowData3(false)
    }

    const handleNext2 = () => {
        setShowHeading(false)
        setShowData1(false)
        setShowData2(false)
        setShowData3(true)
    }

    const handleBack = () => {
        setShowData1(true)
        setShowData2(false)
        setShowHeading(true)
    }

    const handleBack2 = () => {
        setShowData1(false)
        setShowData2(true)
        setShowData3(false)
        setShowHeading(false)
    }

    const handleResize = () => {
        if (window.innerWidth <= 1000) {
            setShowLoginForm(false);
        } else {
            setShowLoginForm(true);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className='form-container'>
                {/* SignUp Form */}
                {showSignupForm && (
                    <div className='signup-form form'>
                        <div className='form-content'>
                            {showHeading && (
                                <div>
                                    <h2>Get Started with Star Taskz</h2>
                                    <p>Manage you task more effeciently</p>
                                </div>
                            )}

                            <div className='main-form'>
                                {showData1 && (
                                    <form action="" className='input-fields'>
                                        <div className='input'>
                                            <p>First Name</p>
                                            <input type="text" placeholder='Full Name' />
                                        </div>
                                        <div className='input'>
                                            <p>Last Name</p>
                                            <input type="text" placeholder='Last Name' />
                                        </div>

                                        <button onClick={handleNext}>
                                            Next
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                        {/* <input type="submit" value="Next" /> */}
                                    </form>
                                )}

                                {showData2 && (
                                    <form action="" className='input-fields'>
                                        <div onClick={handleBack} className='button'>
                                            <i class="fa-solid fa-arrow-left"></i>
                                        </div>
                                        <div className='input'>
                                            <p>Email</p>
                                            <input type="email" placeholder='Email' />
                                        </div>
                                        <div className='input'>
                                            <p>Date of Birth</p>
                                            <input type="date" placeholder='Confirm Password' />
                                        </div>
                                        <button onClick={handleNext2}>
                                            Next
                                            <i class="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </form>
                                )}

                                {showData3 && (
                                    <form action="" className='input-fields'>
                                        <div onClick={handleBack2} className='button'>
                                            <i class="fa-solid fa-arrow-left"></i>
                                        </div>
                                        <div className='input'>
                                            <p>Password</p>
                                            <input type="password" placeholder='Password' />
                                        </div>
                                        <div className='input'>
                                            <p>Confirm Password</p>
                                            <input type="password" placeholder='Confirm Password' />
                                        </div>
                                        <input type="submit" value="Create Account" />
                                    </form>
                                )}
                                <div className='option'>
                                    <hr /> <p>or register with</p> <hr />
                                </div>
                                <button>
                                    <img src={google} alt="" />
                                    <p>Sign up with Google</p>
                                </button>
                            </div>

                            <div className='have-acct'>
                                <p>Already have an account?</p>
                                <button onClick={handleLoginHereClick}>
                                    <p>Login Here</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Login Form */}
                {showLoginForm && (
                    <div className='login-form form'>
                        <div className='form-content'>
                            <div>
                                <h2>Login to Star Taskz</h2>
                                <p>Don't you have some pending taskz?</p>
                            </div>
                            <div className='main-form'>
                                <form action="" className='input-fields'>
                                    <div className='input'>
                                        <p>Email</p>
                                        <input type="email" placeholder='Email' />
                                    </div>
                                    <div className='input'>
                                        <p>Password</p>
                                        <input type="password" placeholder='Password' />
                                    </div>
                                    <input type="submit" value="Sign In" />
                                </form>
                                <div className='option'>
                                    <hr /> <p>or login with</p> <hr />
                                </div>
                                <button>
                                    <img src={google} alt="" />
                                    <p>Sign in with Google</p>
                                </button>
                            </div>
                            <div className='have-acct'>
                                <p>Are you new?</p>
                                <button onClick={SignupHereClick}>
                                    <p>Create Account</p>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <div className={`anime-slider ${animeSlider ? 'anime-left' : 'anime-right'}`}>
                </div>
                <div className={`slider-container ${rigthSlider ? 'left' : 'right'}`}>
                    <Slider hideProp={`${hideSlider ? 'hide' : 'visible'}`}
                            sliderContent={`${hideSlider ? 'hide' : 'visible'}`}
                    />
                </div>
            </div>

            {/* 1000PX Screen size */}

            <div className=''>

            </div>
        </>
    );
}


{/* <GoogleLogin
    onSuccess={credentialResponse => {
        const decoded = jwtDecode(credentialResponse?.credential);
        console.log(decoded);
    }}
    onError={() => {
        console.log('Login Failed');
    }}
/>; */}