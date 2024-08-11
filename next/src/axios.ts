import axiosBase, { AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

const axios = axiosBase.create({
  baseURL: "http://localhost:8888",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:8888",
  },
  withCredentials: true,
  responseType: "json",
});

axios.interceptors.request.use(async (config) => {
  const data = await getSession();

  if (config.headers) {
    config.headers.Authorization = `Bearer ${data?.accessToken}`;
  }

  return config;
});

export const fetcher = <T>(url: string): Promise<T> =>
  axios.get(url).then((res: AxiosResponse<T>) => res.data);

export default axios;
