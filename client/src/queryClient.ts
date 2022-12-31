import { RootState } from "./redux/index";
import { useSelector } from "react-redux";
import { RequestDocument, request, GraphQLClient } from "graphql-request";
import { QueryClient } from "react-query";
import Ax from "./modules/axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

interface FetcherConfig {
  method: "get" | "post" | "put" | "patch" | "delete";
  url: string;
  data?: { [key: string]: any } | string;
  params?: { [key: string]: any };
}

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

export const graphqlFetcher = (query: RequestDocument, variables = {}) => {
  return request(`${BASE_URL}/graphql`, query, variables, {
    // 헤더에 작성된 출처만 브라우저가 리소스를 접근할 수 있도록 허용함
    // *이면 모든 곳에 공개되어 있음을 의미한다.
    "Content-Type": "application/json",
    credentials: "include",
    "Access-Control-Allow-Origin": "http://localhost:8000",
    // Accept: " application/json, text/plain, *",
    // "x-forwarded-proto": "https",
    // credentials: "include",
  });
};

export const restFetcher = async (config: FetcherConfig) => {
  try {
    if (config.data) config.data = JSON.stringify(config.data);
    const res = await Ax.getClient.request(config);
    return res.data;
  } catch (error) {}
};

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
  USER: "USER",
};
