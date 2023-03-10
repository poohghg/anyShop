import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { RequestDocument, request, GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  PRODUCTS_MAINDATA: ["PRODUCTS", "MAIN"],
  CART: "CART",
  USER: "USER",
  USER_AUTH: "USER_AUTH",
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
            retry: 0,
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
  return request(`${BASE_URL}/graphql`, query, variables, {
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
  withCredentials: true,
});

export const authFetcher = async (query: string, variables: {} = {}) => {
  try {
    const res = await auth.request({
      method: "post",
      data: { query, variables },
    });
    const data = res.data;
    if (data.errors && data.errors.length) throw data?.errors[0];
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
