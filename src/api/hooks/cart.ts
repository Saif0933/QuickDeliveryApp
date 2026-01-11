import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

/* ===================== TYPES ===================== */

export interface AddToCartPayload {
  vendorProductId: number;
  productVariantId?: number;
  vendorId: number;
  quantity: number;
  notes?: string;
}

export interface AddToCartResponse {
  success: boolean;
  message: string;
  data: any; // cart item (depends on backend)
}

export const addToCart = async (
  payload: AddToCartPayload
): Promise<AddToCartResponse> => {
  const res = await api.post(
    "/user/cart/add",
    payload
  );

  return res.data;
};
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,

    onSuccess: () => {
      // 🔄 Refresh cart data after adding item
      queryClient.invalidateQueries({
        queryKey: ["user-cart"],
      });
    },
  });
};
