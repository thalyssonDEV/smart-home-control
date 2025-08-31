import axios, { type AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
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
