import React, { useState, useEffect } from 'react';
import './form.css'; // Import CSS file if you have one
import google from '../../asstes/images/google.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Slider from '../../components/slider/Slider';
import { useNavigate } from 'react-router-dom';

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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useHistory hook for navigation

    const handleSignup = async () => {
        // Get user location before creating account
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Your location: Latitude - ${latitude}, Longitude - ${longitude}`);
                alert(`Your location is: Latitude - ${latitude}, Longitude - ${longitude}`);
        
                // Save latitude and longitude to local storage
                localStorage.setItem('latitude', latitude.toString());
                localStorage.setItem('longitude', longitude.toString());
        
                // Make a GET request to OpenWeatherMap API
                const apiKey = '55a2443648a1fec91d831eb470f33fd0';
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
        
                try {
                    const response = await fetch(apiUrl);
                    if (response.ok) {
                        const weatherData = await response.json();
                        console.log('Weather data:', weatherData);
                        // You can now use the weather data as needed, such as displaying it on the UI
                    } else {
                        console.error('Error fetching weather data:', response.statusText);
                        // Handle error fetching weather data
                    }
                } catch (error) {
                    console.error('Error fetching weather data:', error);
                    // Handle error fetching weather data
                }
        
                // Rest of your signup logic (creating account with form data)
                // ...
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please allow location access for this feature.');
            }
        );
        
        navigate('/star-taskz');

        // Create an object with form data
        // const formData = {
        //     firstName: firstName,
        //     lastName: lastName,
        //     dateOfBirth: dateOfBirth,
        //     email: email,
        //     password: password
        // };

        // try {
        //     // Make an API call to your backend server
        //     const response = await fetch('your_api_endpoint', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(formData)
        //     });

        //     if (response.ok) {
        //         // If the API call is successful, navigate to the main page
        //         history.push('/main-page'); // Replace '/main-page' with your desired route
        //     } else {
        //         // Handle error if API call fails
        //         console.error('Error:', response.statusText);
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
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
                                            <input type="text" placeholder='First Name' value={firstName}
                                                onChange={handleFirstNameChange}
                                                autoComplete="firstname" />
                                        </div>
                                        <div className='input'>
                                            <p>Last Name</p>
                                            <input type="text" placeholder='Last Name' value={lastName}
                                                onChange={handleLastNameChange}
                                                autoComplete="lastname" />
                                        </div>

                                        <button onClick={handleNext}>
                                            Next
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                        {/* <input type="submit" value="Next" /> */}
                                    </form>
                                )}

                                {showData2 && (
                                    <form action="" className='input-fields'>
                                        <div onClick={handleBack} className='button'>
                                            <i className="fa-solid fa-arrow-left"></i>
                                        </div>
                                        <div className='input'>
                                            <p>Email</p>
                                            <input type="email" placeholder='Email' value={email}
                                                onChange={handleEmailChange}
                                                autoComplete="email" />
                                        </div>
                                        <div className='input'>
                                            <p>Date of Birth</p>
                                            <input type="date" placeholder='Date of Birth' value={dateOfBirth}
                                                onChange={handleDateOfBirthChange} />
                                        </div>
                                        <button onClick={handleNext2}>
                                            Next
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </button>
                                    </form>
                                )}

                                {showData3 && (
                                    <form action="" className='input-fields'>
                                        <div onClick={handleBack2} className='button'>
                                            <i className="fa-solid fa-arrow-left"></i>
                                        </div>
                                        <div className='input'>
                                            <p>Password</p>
                                            <input type="password" placeholder='Password' value={password}
                                                onChange={handlePasswordChange}
                                                autoComplete="password" />
                                        </div>
                                        <div className='input'>
                                            <p>Confirm Password</p>
                                            <input type="password" placeholder='Confirm Password' />
                                        </div>
                                        {/* Create account button */}
                                        <input onClick={handleSignup} type="submit" value="Create Account" />
                                    </form>
                                )}
                                <div className='option'>
                                    <hr /> <p>or register with</p> <hr />
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
                                    {/* <img src={google} alt="" />
                                    <p>Sign up with Google</p> */}
                                </div>
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
                                    {/* <img src={google} alt="" />
                                    <p>Sign up with Google</p> */}
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


