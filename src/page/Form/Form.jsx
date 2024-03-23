import React, { useState } from 'react';
import './form.css'; // Import CSS file if you have one
import google from '../../asstes/images/google.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Slider from '../../components/slider/Slider';

export default function Form() {
    const [rigthSlider, setRightSlider] = useState(false);
    const [animeSlider, setAnimeSlider] = useState(false);

    const handleLoginHereClick = () => {
        setAnimeSlider(true)
        setTimeout(() => {
            setRightSlider(true);
            console.log('login');
        }, 500); // 5000 milliseconds = 5 seconds
    };

    const SignupHereClick = ()=>{
        setAnimeSlider(false)
        setTimeout(()=>{
            setRightSlider(false);
        }, 500)
        console.log('signup')
    }

    return (
        <>
            <div className='form-container'>
                {/* SignUp Form */}
                <div className='form'>
                    <div className='form-content'>
                        <div>
                            <h2>Get Started with Star Taskz</h2>
                            <p>Manage you task more effeciently</p>
                        </div>
                        <div className='main-form'>
                            <form action="" className='input-fields'>
                                <div className='input'>
                                    <p>Name</p>
                                    <input type="text" placeholder='Full Name' />
                                </div>
                                <div className='input'>
                                    <p>Email</p>
                                    <input type="email" placeholder='Email' />
                                </div>
                                <div className='input'>
                                    <p>Password</p>
                                    <input type="password" placeholder='Password' />
                                </div>
                                <input type="submit" value="Create Account" />
                            </form>
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

                {/* Login Form */}
                <div className='form'>
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
                                <input type="submit" value="Create Account" />
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
                <div className={`anime-slider ${animeSlider ? 'anime-left' : 'anime-right'}`}>
                </div>
                <div className={`slider-container ${rigthSlider ? 'left' : 'right'}`}>
                    <Slider />
                </div>
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