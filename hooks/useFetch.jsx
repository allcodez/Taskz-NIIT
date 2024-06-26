import { useEffect, useState } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetch(url, { signal })
            .then(response => {
                if (!response.ok) {
                    throw Error('Could not fetch the data for that resource');
                }
                return response.json();
            })
            .then(data => {
                setData(data);
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch aborted');
                } else {
                    setError(err.message);
                    setIsPending(false);
                }
            });

        // Cleanup function to abort fetch on component unmount
        return () => abortController.abort();
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;
