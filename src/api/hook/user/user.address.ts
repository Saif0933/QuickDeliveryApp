import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../apiClient";

export interface Address {
  id: string; // BigInt values from backend are normalized as string
  type?: string;
  title?: string;
  mainAddress?: string;
  addressLine1?: string;
  addressLine2?: string;
  completeAddress?: string;
  receiverName?: string;
  receiverContact?: string;
  landMark?: string;
  floor?: string;
  city: string;
  instructions?: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressPayload {
  type: string;
  mainAddress: string;
  completeAddress?: string;
  receiverName?: string;
  receiverContact?: string;
  landMark?: string;
  floor?: string;
  city: string;
  instructions?: string;
  latitude: number | string;
  longitude: number | string;
  isDefault?: boolean;
}

export type UpdateAddressPayload = Partial<CreateAddressPayload> & { id: string };

export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/**
 * Fetch all addresses registered by the current user
 */
export const useAddresses = () => {
  return useQuery<BaseResponse<Address[]>, Error>({
    queryKey: ["addresses"],
    queryFn: async () => {
      const response = await apiClient.get<BaseResponse<Address[]>>("/user/addresses");
      return response.data;
    },
  });
};

/**
 * Fetch a specific address by its ID
 */
export const useAddressById = (id: string) => {
  return useQuery<BaseResponse<Address>, Error>({
    queryKey: ["address", id],
    queryFn: async () => {
      const response = await apiClient.get<BaseResponse<Address>>(`/user/addresses/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};

/**
 * Create a new address entry
 */
export const useCreateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<Address>, Error, CreateAddressPayload>({
    mutationFn: async (payload) => {
      const response = await apiClient.post<BaseResponse<Address>>("/user/addresses", payload);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate the addresses query to automatically refetch lists
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

/**
 * Update an existing address entry by ID
 */
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<Address>, Error, UpdateAddressPayload>({
    mutationFn: async ({ id, ...payload }) => {
      const response = await apiClient.patch<BaseResponse<Address>>(`/user/addresses/${id}`, payload);
      return response.data;
    },
    onSuccess: (data, variables) => {
      // Refetch the list and specific details query
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["address", variables.id] });
    },
  });
};

/**
 * Delete an address entry by ID
 */
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation<BaseResponse<Record<string, never>>, Error, string>({
    mutationFn: async (id) => {
      const response = await apiClient.delete<BaseResponse<Record<string, never>>>(`/user/addresses/${id}`);
      return response.data;
    },
    onSuccess: (data, id) => {
      // Refetch lists and remove deleted address details from query caches
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.removeQueries({ queryKey: ["address", id] });
    },
  });
};
