import React, { useEffect, useState } from 'react';

export default function useFetch(url) {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch for that resource');
                }
                const fetchedData = await response.json();
                setData(fetchedData);
                setIsPending(false);
                setError(null);
            } catch (err) {
                setIsPending(false);
                setError(err.message);
            }
        };

        fetchData();

        return () => {
            // Cleanup function (optional)
        };
    }, [url]);

    return { data, isPending, error };
}
