import { getClient } from "./../queryClient";
import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
const BASEURL = "https://fakestoreapi.com";

// https://yamoo9.github.io/axios/guide/api.html#%EA%B5%AC%EC%84%B1-%EC%98%B5%EC%85%98
class Axios {
  private static instance: Axios;
  private static axiosConfig: AxiosRequestConfig = { baseURL: BASEURL };
  private client: AxiosInstance | null = null;

  constructor() {}

  static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new Axios();
    return this.instance;
  }

  set setConfig(config: AxiosRequestConfig) {
    Axios.axiosConfig = { ...Axios.axiosConfig, ...config };
  }

  get getClient() {
    this.client = axios.create(Axios.axiosConfig);
    return this.client;
  }
}

const Ax = Axios.getInstance();
export default Ax;
