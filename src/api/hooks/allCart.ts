
import { useQuery } from "@tanstack/react-query";
import api from "../api"; // Verify this path matches your project

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
  images: {
    image: {
      url: string;
    };
  }[];
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
  unitPrice?: Price; // Handle backend inconsistencies
  product: CartProduct;
  productVariant?: CartProductVariant;
}

export interface CartResponse {
  success: boolean;
  message: string;
  data: {
    items: CartItem[];
    vendors?: { items: CartItem[] }[];
    totalQuantity: number;
    totalAmount: number;
  };
}

// export interface AddToCartPayload {
//   vendorProductId: number;
//   productVariantId?: number;
//   vendorId: number;
//   quantity: number;
//   notes?: string;
// }

/* ===================== API FUNCTIONS ===================== */

// 1. GET CART
export const getUserCart = async () => {
  const res = await api.get("/user/cart/all");
  return res.data.data;
};

export const useGetUserCart = () => {
  return useQuery({
    queryKey: ["user-cart"],
    queryFn: getUserCart,
  });
};
