import axios, { AxiosRequestConfig } from "axios";
import { RequestDocument, request, GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";
import Ax from "./modules/axios";
// import nodeFetch, { Headers } from "node-fetch";
// import fetchCookie from "fetch-cookie";

interface FetcherConfig {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  data?: { [key: string]: any } | string;
  params?: { [key: string]: any };
}

const BASE_URL = import.meta.env.VITE_SERVER_URL;
export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
  USER: "USER",
};

// https://2ham-s.tistory.com/407
export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

export const graphqlFetcher = async (
  query: RequestDocument,
  variables = {},
) => {
  return request(`http://localhost:8000/graphql`, query, variables, {
    // 헤더에 작성된 출처만 브라우저가 리소스를 접근할 수 있도록 허용함
    // *이면 모든 곳에 공개되어 있음을 의미한다.
    "Access-Control-Allow-Origin": "http://localhost:8000",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json",
    withCredentials: "include",
    // headers,
  });
};

export const auth = axios.create({
  baseURL: `${BASE_URL}/graphql`,
  headers: {
    options: {
      withCredentials: true,
    },
  },
});

auth.interceptors.request.use((config: AxiosRequestConfig) => {
  // const { token, pushNotificationToken } = store.getState().user;
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});
auth.defaults.headers.common["Content-Type"] = "application/json";

export const authFetcher = async (query: string, variables: {} = {}) => {
  return await auth.post("", {
    data: {
      query,
      variables,
    },
  });
};
