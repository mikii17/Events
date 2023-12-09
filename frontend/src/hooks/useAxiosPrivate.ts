import { useEffect } from "react";
import axios_client from "../api/axios_client";

type RefreshFunction = () => Promise<string>;
const useAxiosPrivate = ({
  token,
  refresh,
}: {
  token: string;
  refresh: RefreshFunction;
}) => {
  useEffect(() => {
    const requestInterceptor = axios_client.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseInterceptor = axios_client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error?.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const access_token = await refresh();
          axios_client.defaults.headers.common["Authorization"] =
            "Bearer " + access_token;
          return axios_client(originalRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios_client.interceptors.request.eject(requestInterceptor);
      axios_client.interceptors.response.eject(responseInterceptor);
    };
  }, [token, refresh]);

  return axios_client;
};
export default useAxiosPrivate;
