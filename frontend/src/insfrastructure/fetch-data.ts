import { httpClient } from "../services/api/api-client";
import { type AxiosRequestConfig } from "axios";

type FetchDataConfig = {
  endpoint: string;
  method?: string;
  config?: AxiosRequestConfig;
};

const fetchData = async (requestConfig: FetchDataConfig) => {
  try {
    const { endpoint, method = "GET", config } = requestConfig;

    if (!endpoint) {
      throw new Error("Endpoint (URL) não foi especificado.");
    }

    const response = await httpClient({
      endpoint,
      method,
      config,
    });

    return response.data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export { fetchData };
