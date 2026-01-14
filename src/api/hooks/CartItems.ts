import { useQuery } from "@tanstack/react-query";
import api from "../api";

/* ===================== TYPES ===================== */

export interface Price {
  s: number;
  e: number;
  d: number[];
}

export interface CartProductVariant {
  id: number;
  title: string;
  price: Price;
}

export interface CartProduct {
  id: number;
  name: string;
  images?: {
    image: {
      url: string;
    };
  }[];
}

export interface CartItem {
  id: number;
  vendorId: number;
  vendorProductId: number;
  productVariantId?: number;
  quantity: number;
  notes?: string;
  price: Price;
  product: CartProduct;
  productVariant?: CartProductVariant;
}

export interface CartItemResponse {
  success: boolean;
  message: string;
  data: CartItem;
}

export const getCartItemById = async (
  cartId: number
): Promise<CartItem> => {
  const res = await api.get(
    `/user/cart/${cartId}`
  );

  return res.data.data;
};

export const useGetCartItemById = (cartId: number) => {
  return useQuery({
    queryKey: ["user-cart-item", cartId],
    queryFn: () => getCartItemById(cartId),
    enabled: !!cartId, // prevents call if id is undefined/null
  });
};
