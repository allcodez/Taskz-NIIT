import { useState, useEffect } from 'react';

export const useLocationFetch = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const fetchLocation = async () => {
        try {
            const response = await fetch('http://api.ipstack.com/check?access_key=f4fdadf88575821aefce157c6717f610');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Data received:", data);

            if (data.error) {
                throw new Error(data.error.info);
            }

            setLocation({
                city: data.city,
                country: data.country_name,
                latitude: data.latitude,
                longitude: data.longitude,
            });
        } catch (error) {
            console.error('Error fetching location:', error);
            setError(error.message);
        }
    };

    useEffect(() => {
        fetchLocation();
    }, []);

    return { location, error };
};
