import React, { useContext } from 'react';
import { WeatherContext } from '../../../hooks/WeatherProvider';
import './weatherBar.css';
import WeatherInfo from './WeatherInfo';
import { useLocationFetch } from '../../../hooks/useLocationFetch';

export default function WeatherBar() {
    const {
        selectedWeatherData,
        weatherBarVisible,
        selectedDate,
        setWeatherBarVisible,
    } = useContext(WeatherContext);
    const { location, error } = useLocationFetch();
    const weatherBarClass = weatherBarVisible ? 'weather-bar visible' : 'weather-bar hidden';

    if (!selectedWeatherData) {
        return <div className={weatherBarClass}>Select a day to view weather information...</div>;
    }

    const {
        weather,
        main: { temp, feels_like, humidity, pressure },
        wind: { speed },
        sys: { sunrise, sunset },
    } = selectedWeatherData;

    return (
        <div className={`weather-bar-container ${weatherBarClass}`}>
            <div className='weather-bar-control'>
                <i className='bx bx-arrow-to-right' onClick={() => setWeatherBarVisible(false)}></i>
                <div className='weather-bar-header'>
                    <h3>Weather Info</h3>
                    <span>{selectedDate}</span>
                </div>
            </div>

            <div className='weather-bar-body'>
                <div className='weather-bar-content1'>
                    <h2>
                        Lagos
                    </h2>
                    {/* {location ? (
                        <h2>
                            {location.city}, {location.country}
                        </h2>
                    ) : (
                        <p>{error ? `Error: ${error}` : 'Loading location...'}</p>
                    )} */}
                    <div className='weather-bar-content1-desc'>
                        {weather && weather[0] &&
                            <div className='weather-bar-img'>
                                <WeatherInfo weatherInfo={weather[0].main} />
                            </div>
                        }
                        <p>{weather[0].main}</p>
                    </div>
                </div>

                <div className='weather-bar-content'>
                    <p>Temperature</p>
                    <h2>{temp} °C</h2>
                </div>
                <div className='weather-bar-content'>
                    <p>Feels like</p>
                    <h2>{feels_like} °C</h2>
                </div>
                <div className='weather-bar-content'>
                    <p>Humidity</p>
                    <h2>{humidity}%</h2>
                </div>
                <div className='weather-bar-content'>
                    <p>Pressure</p>
                    <h2>{pressure} hPa</h2>
                </div>
            </div>
        </div>
    );
}
