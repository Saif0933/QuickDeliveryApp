
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api";

/* ===================== TYPES ===================== */

export interface Price {
  s: number;
  e: number;
  d: number[];
}

export interface ProductVariant {
  id: string;
  vendorProductId: string;
  title: string;
  price: Price;
  isDefault: boolean;
  position: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  image: {
    url: string;
    public_id: string;
  };
}

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  marketPrice: Price;
  sellingPrice: Price;
  vendorPrice: Price | null;
  weight: string;
  pieces: string;
  isActive: boolean;
  isMandatory: boolean;
  isVeg: boolean;
  ingredient: any[];
  tags: any[];
  categoryId: string;
  subCategoryId: string;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  category: Category;
}

export interface VendorProduct {
  id: string;
  vendorId: string;
  productId: string;
  price: Price;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  productVariants: ProductVariant[];
  product: Product;
}

export interface Pagination {
  total: number;
  currentPage: number;
  totalPages: number;
  count: number;
  limit: number;
}

export interface VendorInventoryResponse {
  products: VendorProduct[];
  pagination: Pagination;
}

/* ===================== PARAMS ===================== */

export interface VendorInventoryParams {
  vendorId: string;
  page?: number;
  limit?: number;
  search?: string;
}

/* ===================== API ===================== */

export const getVendorInventory = async ({
  vendorId,
  page = 1,
  limit = 10,
  search = "",
}: VendorInventoryParams): Promise<VendorInventoryResponse> => {
  const res = await api.get(
    `/vendor/inventory/all/${vendorId}`,
    {
      params: { page, limit, search },
    }
  );

  return res.data.data;
};

/* ===================== FIXED INFINITE QUERY ===================== */

export const useGetVendorInventory = ({
  vendorId,
  limit = 10,
  search = "",
}: VendorInventoryParams) => {
  return useInfiniteQuery<VendorInventoryResponse, Error>({
    queryKey: ["vendor-inventory", vendorId, search],
    initialPageParam: 1, // ✅ REQUIRED IN v5
    queryFn: ({ pageParam }) =>
      getVendorInventory({
        vendorId,
        page: pageParam as number,
        limit,
        search,
      }),
    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.pagination;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
