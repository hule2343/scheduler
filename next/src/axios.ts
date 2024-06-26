import axiosBase, { AxiosResponse } from "axios";
import { useSession } from "next-auth/react";

const axios = axiosBase.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8000",
  },
  withCredentials: true,
  responseType: "json",
});

axios.interceptors.request.use((config) => {
  const { data } = useSession();

  if (config.headers) {
    config.headers.Authorization = `Bearer ${data?.accessToken}`;
  }

  return config;
});

export const fetcher = <T>(url: string): Promise<T> =>
  axios.get(url).then((res: AxiosResponse<T>) => res.data);

export default axios;
