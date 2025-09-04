import axios, { type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api/`,
  headers: {
    "Content-Type": "application/json",
  },
});

type HttpClientParams = {
  endpoint: string;
  method: string;
  config?: AxiosRequestConfig;
};

const httpClient = ({ endpoint, method, config }: HttpClientParams) => {
  return axiosInstance({
    url: endpoint,
    method: method,
    ...config,
  });
};

export { httpClient };
