import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api';

export type Address = {
  id: any;
  type: string;
  mainAddress: string;
  completeAddress: string;
  receiverName: string;
  receiverContact: string;
  city?: string;
  landMark?: string;
  floor?: string;
  instructions?: string;
  isDefault: boolean;
  latitude?: number;
  longitude?: number;
};

// Fetch all addresses
export const useAddresses = () => {
  return useQuery<Address[], Error>({
    queryKey: ['addresses'],
    queryFn: async () => {
      const res = await api.get('/user/address/all');
      return res.data.data;
    },
  });
};

// Create a new address
export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Address>) => {
      const res = await api.post('/user/address/create', data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// Delete an address
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: any) => {
      const res = await api.delete(`/user/address/${id}`);
      if (res.data.success === false) {
        throw new Error(res.data.message || "Failed to delete address");
      }
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// Update an address
export const useUpdateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Address> }) => {
      const res = await api.put(`/user/address/${id}`, data);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// Set address as default
export const useSetDefaultAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.put(`/user/address/${id}`, { isDefault: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};
