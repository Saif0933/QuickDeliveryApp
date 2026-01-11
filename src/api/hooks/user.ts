import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";

/* ===================== TYPES ===================== */

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone?: string;
  mobile?: string; // Read-only mobile number
  createdAt?: string;
  updatedAt?: string;
}

export interface GetUserProfileResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  phone?: string;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
  data: UserProfile;
}

/* ===================== API FUNCTIONS ===================== */

// GET USER PROFILE
export const getUserProfile = async (): Promise<UserProfile> => {
  const res = await api.get("/user/profile");
  return res.data.data;
};

// UPDATE USER PROFILE
export const updateUser = async (
  payload: UpdateUserPayload
): Promise<UpdateUserResponse> => {
  const res = await api.put("/user/update", payload);
  return res.data;
};

/* ===================== HOOKS ===================== */

// Hook to get user profile
export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user-profile"],
    queryFn: getUserProfile,
  });
};

// Hook to update user profile
export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser,

    onSuccess: () => {
      // 🔄 Refresh user profile cache after update
      queryClient.invalidateQueries({
        queryKey: ["user-profile"],
      });
    },
  });
};
