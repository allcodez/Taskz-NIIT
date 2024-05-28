import React, { useState, useEffect } from 'react';
import './signup.css'; // Import CSS file if you have one
import google from '../../asstes/images/google.png';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Slider from '../../components/slider/Slider';
import { useNavigate } from 'react-router-dom';
import { BiShow, BiHide } from 'react-icons/bi'; // Importing eye icons from react-icons/bi

export default function Login() {
    const [rigthSlider, setRightSlider] = useState(false);
    const navigate = useNavigate(); // Initialize useHistory hook for navigation
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loginError, setLoginError] = useState(""); // State for login error message

    const handleLogin = async (e) => {
        e.preventDefault();

        // Reset errors
        setEmailError("");
        setPasswordError("");

        // Check if fields are empty
        if (!email) {
            setEmailError("Email is required");
        }
        if (!password) {
            setPasswordError("Password is required");
        }
        if (!email || !password) {
            return;
        }

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
                        if (data.statusCode === 200) {
                            console.log('Login successful:', data);

                            sessionStorage.setItem('token', data.token);
                            sessionStorage.setItem('refreshToken', data.refreshToken);
                            sessionStorage.setItem('userId', data.userId);  // Store user ID in session storage

                            navigate('/star-taskz');
                        } else {
                            console.error('Login error:', data);
                            setLoginError(data.message || 'Login failed');
                        }
                    } else {
                        const errorData = await response.json();
                        console.error('Login error:', errorData);
                        setLoginError(errorData.message || 'Login failed');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    setLoginError('An error occurred during login');
                }
            },
            (error) => {
                console.error('Error getting location:', error);
                alert('Unable to get your location. Please allow location access for this feature.');
            }
        );
    };

    const handleGoogleLoginSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse?.credential);
        const { email } = decoded;

        const generatedPassword = `sTaR_TaSkZ@30_May@${email}`;
        const payload = {
            email, 
            password: generatedPassword
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
                if (data.statusCode === 200) {
                    console.log('Google Login successful:', data);

                    sessionStorage.setItem('token', data.token);
                    sessionStorage.setItem('refreshToken', data.refreshToken);
                    sessionStorage.setItem('userId', data.userId);

                    navigate('/star-taskz');
                } else {
                    console.error('Google Login error:', data);
                    setLoginError(data.message || 'Google Login failed');
                }
            } else {
                const errorData = await response.json();
                console.error('Google Login error:', errorData);
                setLoginError(errorData.message || 'Google Login failed');
            }
        } catch (error) {
            console.error('Google Login Error:', error);
            setLoginError('An error occurred during Google Login');
        }
    };


    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    const SignupHereClick = () => {
        navigate('/')
    }

    // useEffect(() => {
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);

    return (
        <>
            <div className='form-container login'>
                <div className={`slider-container ${rigthSlider ? 'left' : 'right'}`}>
                    <Slider />
                </div>

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
                                    <input
                                        type="email"
                                        placeholder='Email'
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {emailError && <span className="error">{emailError}</span>}
                                </div>
                                <div className='input'>
                                    <p>Password</p>
                                    <div className='password-input'>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder='Password'
                                            value={password}
                                            onChange={handlePasswordChange}
                                        />
                                        <span onClick={togglePasswordVisibility}>
                                            {showPassword ? <BiHide /> : <BiShow />}
                                        </span>
                                    </div>
                                    {passwordError && <span className="error">{passwordError}</span>}
                                </div>
                                {loginError && <div className="error">{loginError}</div>} {/* Display login error message */}
                                <input type="submit" value="Sign In" onClick={handleLogin} />
                            </form>

                            <div className='option'>
                                <hr /> <p>or login with</p> <hr />
                            </div>
                            <div className='google-button'>
                                <GoogleLogin
                                    onSuccess={handleGoogleLoginSuccess}
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
            </div>
        </>
    );
}
