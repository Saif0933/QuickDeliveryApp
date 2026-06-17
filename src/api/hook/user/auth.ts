import { useMutation } from "@tanstack/react-query";
import apiClient from "../../apiClient";

export interface SendOtpPayload {
  phoneNumber: string;
}

export interface SendOtpResponse {
  success: boolean;
  message: string;
  data: {
    code: string;
  };
}

export interface VerifyOtpPayload {
  phoneNumber: string;
  code: string;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      id: string;
      phoneNumber: string;
      createdAt: string;
      updatedAt: string;
      [key: string]: any;
    };
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
  data: Record<string, never>;
}

/**
 * Hook to request an OTP code for verification
 */
export const useSendOtp = () => {
  return useMutation<SendOtpResponse, Error, SendOtpPayload>({
    mutationFn: async (payload) => {
      const response = await apiClient.post<SendOtpResponse>("/user/send-otp", payload);
      return response.data;
    },
  });
};

/**
 * Hook to verify the OTP code and log in the user
 */
export const useVerifyOtp = () => {
  return useMutation<VerifyOtpResponse, Error, VerifyOtpPayload>({
    mutationFn: async (payload) => {
      const response = await apiClient.post<VerifyOtpResponse>("/user/verify-otp", payload);
      return response.data;
    },
  });
};

/**
 * Hook to clear authentication credentials and log out the user
 */
export const useLogout = () => {
  return useMutation<LogoutResponse, Error, void>({
    mutationFn: async () => {
      const response = await apiClient.post<LogoutResponse>("/user/logout");
      return response.data;
    },
  });
};
