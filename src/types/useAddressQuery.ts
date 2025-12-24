import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/api';

// --- TYPES (Unchanged) ---
export type Address = {
  id: number;
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
};

// --- HOOKS ---

// 1. Fetch Addresses
export const useAddresses = () => {
  return useQuery<Address[], Error>({
    queryKey: ['addresses'],
    queryFn: async () => {
      const res = await api.get('/user/address/all');
      return res.data.data;
    },
  });
};

// 2. Create Address
export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Address>) => {
      const res = await api.post('/user/address/create', data);
      return res.data.data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// 3. Delete Address
export const useDeleteAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/user/address/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['addresses'] });
    },
  });
};

// 4. Set Default Address
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