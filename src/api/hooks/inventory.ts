import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api";

export interface Price {
  s: number;
  e: number;
  d: number[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  marketPrice: Price;
  sellingPrice: Price;
  isVeg: boolean;
  images: { image: { url: string } }[];
  category: { name: string };
}

export interface VendorProduct {
  id: string;
  vendorId: string;
  productId: string;
  price: Price;
  product: Product;
  vendor?: any;
  Vendor?: any;
}

export interface InventoryResponse {
  success: boolean;
  message: string;
  data: {
    products: VendorProduct[];
    pagination: {
      total: number;
      currentPage: number;
      totalPages: number;
      count: number;
      limit: number;
    };
  };
}

export interface GetInventoryParams {
  categoryId: string;
  page?: number;
  limit?: number;
  search?: string;
  userId?: string;
}

export const getInventoryByCategory = async ({
  categoryId,
  page = 1,
  limit = 10,
  search = "",
  userId = "1",
}: GetInventoryParams): Promise<InventoryResponse["data"]> => {
  const res = await api.get(`/vendor/inventory/all/${categoryId}`, {
    params: { page, limit, search, userId },
  });
  return res.data.data;
};

export const useGetInventoryByCategory = ({
  categoryId,
  limit = 10,
  search = "",
  userId = "1",
}: Omit<GetInventoryParams, "page">) => {
  return useInfiniteQuery({
    queryKey: ["inventory-by-category", categoryId, search, userId],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getInventoryByCategory({
        categoryId,
        page: pageParam as number,
        limit,
        search,
        userId,
      }),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!categoryId,
  });
};
