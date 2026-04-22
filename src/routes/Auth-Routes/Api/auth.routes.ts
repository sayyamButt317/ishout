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

export const verifyEmailApi = async (token: string) => {
  const response = await api.get<{ message: string }>(
    `${AuthENDPOINT.VERIFY_EMAIL}?token=${token}`
  );
  return response.data;
};

export const uploadUserLogoApi = async (user_id: string, file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post(
    AuthENDPOINT.UPLOAD_USER_LOGO(user_id),
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
  return response.data;
};