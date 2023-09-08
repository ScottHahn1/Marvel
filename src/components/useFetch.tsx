import { useEffect, useState } from 'react';
import axios, { AxiosHeaders } from 'axios';

const useFetch = <S, T>(url: string, initialState: S, params: T, headers?: AxiosHeaders, pageNumber?: number) => {
    const [data, setData] = useState<S>(initialState);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        if (url) {
            setLoading(true);
            setError(false);
            axios({
                method: "GET",
                headers: headers,
                url: url,
                params: params
            })
            .then(res => {
                setData((prev: any) => (prev ? [...prev, res.data] : res.data));
                setHasMore(res.data ? true : false);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError(true)
            });
        }
    }, [url, pageNumber])

    return { data, hasMore, loading, error };
}

export default useFetch;