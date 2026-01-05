import { api, refreshClient } from "@/api";

type LoginPayload = {
  username: string;
  password: string;
};

type SignupPayload = {
  firstname: string;
  lastname: string;
  username: string;
  email?: string;
  password: string;
};

export const login = (payload: LoginPayload) => {
  return api.post("/auth/login/", payload);
};

export const signup = (payload: SignupPayload) => {
  return api.post("/auth/signup/", payload);
};

export const logout = () => {
  return api.post("/auth/logout/");
};

export const refreshToken = async () => {
  const response = await refreshClient.post("/auth/token/refresh/");
  return response.data.access;
};
