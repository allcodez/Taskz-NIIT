import React, { useState, useEffect } from 'react';
import './signup.css'; // Import CSS file if you have one
import { GoogleLogin } from '@react-oauth/google';
// import jwtDecode from "jwt-decode";
import Slider from '../../components/slider/Slider';
import { useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi'; // Importing eye icons from react-icons/bi
import { useGoogleOneTapLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function SignUp() {
    const [rightSlider, setRightSlider] = useState(false);
    const [animeSlider, setAnimeSlider] = useState(false);
    const [showData1, setShowData1] = useState(true);
    const [showData2, setShowData2] = useState(false);
    const [showData3, setShowData3] = useState(false);
    const [showHeading, setShowHeading] = useState(true);
    const [showSignupForm, setShowSignupForm] = useState(true);
    const [showLoginForm, setShowLoginForm] = useState(window.innerWidth > 1000);
    const [hideSlider, setHideSlider] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState("");
    const navigate = useNavigate(); // Initialize useHistory hook for navigation

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return;
        } else {
            setPasswordError("");
        }

        // Get user location before creating account
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Your location: Latitude - ${latitude}, Longitude - ${longitude}`);

                // Save latitude and longitude to local storage
                localStorage.setItem('latitude', latitude.toString());
                localStorage.setItem('longitude', longitude.toString());

                // Make a GET request to OpenWeatherMap API
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

                // Prepare the request payload
                const payload = {
                    firstName,
                    lastName,
                    dateOfBirth,
                    email,
                    password,
                    // role: 'USER', // Assuming you have a 'user' role
                };
                console.log('Signup payload', payload);

                try {
                    // Make a POST request to your signup endpoint
                    const response = await fetch('https://star-taskz-backend.onrender.com/star-taskz/api/user/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });

                    if (response.ok) {
                        // Handle successful signup
                        const data = await response.json();
                        console.log('Signup successful:', data);
                        // You can redirect the user to another page or show a success message
                        navigate('/login'); // Assuming you have a /login route
                    } else {
                        // Handle signup error
                        const errorData = await response.json();
                        console.error('Signup error:', errorData);
                        // You can display an error message to the user
                    }
                } catch (error) {
                    console.error('Error:', error);
                    // Handle network or other errors
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please allow location access for this feature.');
            }
        );
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Your location: Latitude - ${latitude}, Longitude - ${longitude}`);

                // Save latitude and longitude to local storage
                localStorage.setItem('latitude', latitude.toString());
                localStorage.setItem('longitude', longitude.toString());

                // Make a GET request to OpenWeatherMap API
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

                // Prepare the request payload
                const decoded = jwtDecode(credentialResponse?.credential);
                const { email, family_name: familyName, given_name: givenName } = decoded;

                const generatedPassword = `sTaR_TaSkZ@30_May@${email}`;
                const payload = {
                    email,
                    lastName: familyName,
                    firstName: givenName,
                    password: generatedPassword,
                    // role: 'USER',
                };

                console.log('payload', payload)

                try {
                    const response = await fetch('https://star-taskz-backend.onrender.com/star-taskz/api/user/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('data', data)
                        console.log('Google Signup successful');
                        navigate('/login');
                    } else {
                        const errorData = await response.json();
                        console.error('Google Signup error:', errorData);
                    }
                } catch (error) {
                    console.error('Google Signup Error:', error);
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please allow location access for this feature.');
            }
        );
    };

    const handleLoginHereClick = () => {
        navigate('/login');
        setAnimeSlider(true);
        setHideSlider(true);
        setTimeout(() => {
            setRightSlider(true);
            console.log('login');
        }, 700);

        setTimeout(() => {
            setHideSlider(false);
        }, 1000);

        if (window.innerWidth < 1000) {
            setShowSignupForm(false);
            setShowLoginForm(true);
        }
    };

    const SignupHereClick = () => {
        setAnimeSlider(false);
        setHideSlider(true);
        setTimeout(() => {
            setRightSlider(false);
        }, 700);
        console.log('signup');

        setTimeout(() => {
            setHideSlider(false);
        }, 1000);

        if (window.innerWidth < 1000) {
            setShowSignupForm(true);
            setShowLoginForm(false);
        }
    };

    const handleNext = () => {
        let valid = true;

        if (!firstName) {
            setFirstNameError("First name is required.");
            valid = false;
        } else {
            setFirstNameError("");
        }

        if (!lastName) {
            setLastNameError("Last name is required.");
            valid = false;
        } else {
            setLastNameError("");
        }

        if (!dateOfBirth) {
            setDateOfBirthError("Date of birth is required.");
            valid = false;
        } else {
            setDateOfBirthError("");
        }

        if (valid) {
            setShowHeading(false);
            setShowData1(false);
            setShowData2(true);
            setShowData3(false);
        }
    };

    const handleNext2 = () => {
        setShowHeading(false);
        setShowData1(false);
        setShowData2(false);
        setShowData3(true);
    };

    const handleBack = () => {
        setShowData1(true);
        setShowData2(false);
        setShowHeading(true);
    };

    const handleBack2 = () => {
        setShowData1(false);
        setShowData2(true);
        setShowData3(false);
        setShowHeading(false);
    };

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
    }

    function handleConfirmPasswordChange(event) {
        setConfirmPassword(event.target.value);
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    function toggleConfirmPasswordVisibility() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className='form-container'>
                <div className={`slider-container ${rightSlider ? 'left' : 'right'}`}>
                    <Slider />
                </div>

                <div className='signup-form form'>
                    <div className='form-content'>
                        {showHeading && (
                            <div>
                                <h2>Get Started with Star Taskz</h2>
                                <p>Manage your tasks more efficiently</p>
                            </div>
                        )}

                        <form onSubmit={handleSignup} className='main-form'>
                            {showData1 && (
                                <div className='input-fields'>
                                    <div className='input'>
                                        <p>First Name</p>
                                        <input required type="text" placeholder='First Name' value={firstName}
                                            onChange={handleFirstNameChange}
                                            autoComplete="firstname" />
                                        {firstNameError && <p className="error">{firstNameError}</p>}
                                    </div>
                                    <div className='input'>
                                        <p>Last Name</p>
                                        <input required type="text" placeholder='Last Name' value={lastName}
                                            onChange={handleLastNameChange}
                                            autoComplete="lastname" />
                                        {lastNameError && <p className="error">{lastNameError}</p>}
                                    </div>
                                    <div className='input'>
                                        <p>Date of Birth</p>
                                        <input required type="date" placeholder='Date of Birth' value={dateOfBirth}
                                            onChange={handleDateOfBirthChange} />
                                        {dateOfBirthError && <p className="error">{dateOfBirthError}</p>}
                                    </div>

                                    <button type="button" onClick={handleNext}>
                                        Next
                                        <i className="fa-solid fa-arrow-right"></i>
                                    </button>
                                </div>
                            )}

                            {showData2 && (
                                <div className='input-fields'>
                                    <div onClick={handleBack} className='button'>
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </div>
                                    <div className='input'>
                                        <p>Email</p>
                                        <input required type="email" placeholder='Email' value={email}
                                            onChange={handleEmailChange}
                                            autoComplete="email" />
                                    </div>
                                    <div className='input'>
                                        <p>Password</p>
                                        <div className="password-input">
                                            <input
                                                required
                                                type={showPassword ? "text" : "password"}
                                                placeholder='Password'
                                                value={password}
                                                onChange={handlePasswordChange}
                                                autoComplete="password"
                                            />
                                            <span onClick={togglePasswordVisibility}>
                                                {showPassword ? <BiHide /> : <BiShow />}
                                            </span>
                                        </div>
                                    </div>
                                    <div className='input'>
                                        <p>Confirm Password</p>
                                        <div className="password-input">
                                            <input
                                                required
                                                type={showConfirmPassword ? "text" : "password"}
                                                placeholder='Confirm Password'
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                            />
                                            <span onClick={toggleConfirmPasswordVisibility}>
                                                {showConfirmPassword ? <BiHide /> : <BiShow />}
                                            </span>
                                        </div>
                                    </div>
                                    {passwordError && <p className="error">{passwordError}</p>}
                                    <input type="submit" value="Create Account" />
                                </div>
                            )}

                            {showData3 && (
                                <div className='input-fields'>
                                    <div onClick={handleBack2} className='button'>
                                        <i className="fa-solid fa-arrow-left"></i>
                                    </div>
                                </div>
                            )}
                            <div className='option'>
                                <hr /> <p>or register with</p> <hr />
                            </div>
                            <div className='google-button'>
                                <GoogleLogin
                                    onSuccess={handleGoogleLoginSuccess}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </div>
                        </form>

                        <div className='have-acct'>
                            <p>Already have an account?</p>
                            <button onClick={handleLoginHereClick}>
                                <p>Login Here</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
