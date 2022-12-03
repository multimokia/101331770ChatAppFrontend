import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function useFetch<T>(url: string, config?: AxiosRequestConfig<any> | undefined) {
    const [data, setData] = useState<T>({} as T);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setLoading(true);
        axios.get(url, config)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);

    const refetch = () => {
        setLoading(true);

        axios.get(url, config)
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return { data, loading, error, refetch };
}
