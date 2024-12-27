import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
    timeout: 10000,
  });

  api.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return api;
};
