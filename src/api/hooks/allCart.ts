// import { useQuery } from "@tanstack/react-query";
// import api from "../api";

// /* ===================== TYPES ===================== */

// export interface Price {
//   s: number;
//   e: number;
//   d: number[];
// }

// export interface CartProductVariant {
//   id: number;
//   title: string;
//   price: Price;
//   images: {
//     image: {
//       url: string;
//     };
//   }[];
// }

// export interface CartProduct {
//   id: number;
//   name: string;
//   images?: {
//     image: {
//       url: string;
//     };
//   }[];
// }

// export interface CartItem {
//   id: number;
//   vendorId: number;
//   vendorProductId: number;
//   productVariantId?: number;
//   quantity: number;
//   notes?: string;
//   price: Price;
//   product: CartProduct;
//   productVariant?: CartProductVariant;
// }

// export interface CartResponse {
//   success: boolean;
//   message: string;
//   data: {
//     items: CartItem[];
//     totalQuantity: number;
//     totalAmount: number;
//   };
// }
// export const getUserCart = async (): Promise<CartResponse["data"]> => {
//   const res = await api.get(
//     "/user/cart/all"
//   );

//   return res.data.data;
// };
// export const useGetUserCart = () => {
//   return useQuery({
//     queryKey: ["user-cart"],
//     queryFn: getUserCart,
//   });
// };


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

// // 2. ADD TO CART
// export const addToCart = async (payload: AddToCartPayload) => {
//   const res = await api.post("/user/cart/add", payload);
//   return res.data;
// };

// // 3. REMOVE FROM CART
// export const removeCartItem = async (cartItemId: number) => {
//   const res = await api.delete(`/user/cart/remove/${cartItemId}`);
//   return res.data;
// };

/* ===================== HOOKS ===================== */

export const useGetUserCart = () => {
  return useQuery({
    queryKey: ["user-cart"],
    queryFn: getUserCart,
  });
};

// // This was missing or named incorrectly causing the error
// export const useAddToCart = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: addToCart,
//     onSuccess: () => {
//       // 🔄 Refresh cart data automatically after add
//       queryClient.invalidateQueries({ queryKey: ["user-cart"] });
//     },
//   });
// };

// export const useRemoveCartItem = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: removeCartItem,
//     onSuccess: () => {
//       // 🔄 Refresh cart data automatically after remove
//       queryClient.invalidateQueries({ queryKey: ["user-cart"] });
//     },
//   });
// };