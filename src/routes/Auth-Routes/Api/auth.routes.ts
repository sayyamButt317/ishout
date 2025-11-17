import { LoginRequestProps, LoginResponseProps } from "@/src/types/Auth-Type/login-type";
import { AuthENDPOINT } from "./endpoint";
import axios from "axios";
import useAuthStore from "@/src/store/AuthStore/authStore";
import { toast } from "sonner";
import { SignUpRequestProps, SignUpResponseProps } from "@/src/types/Auth-Type/signup-type";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const isLoginRequest =
      originalRequest?.url?.includes(AuthENDPOINT.LOGIN) &&
      originalRequest?.method === 'post';
    if (error.response && error.response.status === 401 && !isLoginRequest) {
      useAuthStore().clearAuth();
      toast.error('Session expired. Please login again.');
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);

export const SignUpMutationApi = async (signUpRequest: SignUpRequestProps) => {
  const response = await api.post<SignUpResponseProps>(AuthENDPOINT.SIGN_UP, signUpRequest);
  return response.data;
}

export const LoginMutationApi = async (loginRequest: LoginRequestProps) => {
  const response = await api.post<LoginResponseProps>(AuthENDPOINT.LOGIN, loginRequest);
  return response.data;
}