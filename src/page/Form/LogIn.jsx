import React, { useState, useEffect } from 'react';
import './signup.css'; // Import CSS file if you have one
import google from '../../asstes/images/google.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Slider from '../../components/slider/Slider';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [rigthSlider, setRightSlider] = useState(false);
    const [animeSlider, setAnimeSlider] = useState(false);
    const [showData1, setShowData1] = useState(true);
    const [showData2, setShowData2] = useState(false);
    const [showData3, setShowData3] = useState(false);
    const [showHeading, setShowHeading] = useState(true);
    const [showSignupForm, setShowSignupForm] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(window.innerWidth > 1000);
    const [hideSlider, setHideSlider] = useState(false)
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useHistory hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault();

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Your location: Latitude - ${latitude}, Longitude - ${longitude}`);
                alert(`Your location is: Latitude - ${latitude}, Longitude - ${longitude}`);

                localStorage.setItem('latitude', latitude.toString());
                localStorage.setItem('longitude', longitude.toString());

                const apiKey = 'e5883bae80f6bb5683f7e4a084f547fe';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const weatherData = await response.json();
                        console.log('Weather data:', weatherData);
                    } else {
                        console.error('Error fetching weather data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                }

                const email = document.querySelector('input[type="email"]').value;
                const password = document.querySelector('input[type="password"]').value;

                const payload = {
                    email,
                    password,
                };

                try {
                    const response = await fetch('https://startaskzbackend-production.up.railway.app/auth/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Login successful:', data);

                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('refreshToken', data.refreshToken);
                        sessionStorage.setItem('userId', data.userId);  // Store user ID in session storage

                        console.log()

                        navigate('/star-taskz');
                    } else {
                        const errorData = await response.json();
                        console.error('Login error:', errorData);
                    }
                } catch (error) {
                    console.error('Error:', error);
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please allow location access for this feature.');
            }
        );
    };


    const makeAuthenticatedRequest = async (url, options = {}) => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            console.error('No token found in session storage');
            return;
        }

        // Add the Authorization header with the token
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`,
        };

        try {
            const response = await fetch(url, options);
            if (response.ok) {
                return await response.json();
            } else {
                console.error('Error with authenticated request:', response.statusText);
                // Handle token expiration or other errors
                if (response.status === 401) {
                    // Token might be expired, handle re-authentication
                    console.log('Token expired or unauthorized, handle re-authentication');
                }
            }
        } catch (error) {
            console.error('Network error:', error);
        }
    };

    // Example usage of an authenticated request
    const fetchUserData = async () => {
        const data = await makeAuthenticatedRequest('https://startaskzbackend-production.up.railway.app/user/data');
        console.log('User data:', data);
    };



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
        navigate('/')
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

    function handleFirstNameChange(event) {
        setFirstName(event.target.value);
    }

    function handleLastNameChange(event) {
        setLastName(event.target.value);
    }

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handleDateOfBirthChange(event) {
        setDateOfBirth(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
        // setIsPasswordTooShort(event.target.value.length >= 1 && event.target.value.length < 8);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className='form-container login'>
                {/* SignUp Form */}
                {/* {showSignupForm && ( */}
                <div className={`slider-container ${rigthSlider ? 'left' : 'right'}`}>
                    <Slider
                    />
                </div>

                {/* )} */}

                {/* Login Form */}

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
                                <input type="submit" value="Sign In" onClick={handleLogin} />
                            </form>
                            <div className='option'>
                                <hr /> <p>or login with</p> <hr />
                            </div>
                            <div className='google-button'>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        const decoded = jwtDecode(credentialResponse?.credential);
                                        console.log(decoded);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                        </div>
                        <div className='have-acct'>
                            <p>Are you new?</p>
                            <button onClick={SignupHereClick}>
                                <p>Create Account</p>
                            </button>
                        </div>
                    </div>
                </div>

                {/* <div className={`anime-slider ${animeSlider ? 'anime-left' : 'anime-right'}`}>
                </div> */}

            </div>

            {/* 1000PX Screen size */}

            <div className=''>

            </div>
        </>
    );
}


