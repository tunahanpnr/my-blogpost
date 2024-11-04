import { useState, useEffect, useCallback } from 'react';

interface ApiResponse<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
}

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: never;
}

export function useApi<T>(url: string, refresh: boolean, options?: FetchOptions) {
    const [response, setResponse] = useState<ApiResponse<T>>({
        data: null,
        loading: false,
        error: null,
    });

    const fetchData = useCallback(async () => {
        setResponse({ data: null, loading: true, error: null });

        try {
            const res = await fetch(url, {
                method: options?.method || 'GET',
                body: JSON.stringify(options?.body) || null,
            });

            if (!res.ok) {
                throw new Error(`Error: ${res.status} ${res.statusText}`);
            }

            const data = await res.json();
            setResponse({ data, loading: false, error: null });
            console.log(data)
        } catch (error) {
            setResponse({ data: null, loading: false, error: (error as Error).message });
        }
    }, [url, options, refresh]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return response;
}
