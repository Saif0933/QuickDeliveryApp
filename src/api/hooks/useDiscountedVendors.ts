import { useQuery } from "@tanstack/react-query";
import api from "../api";

export interface DiscountedVendorListParams {
  page?: number;
  limit?: number;
  lat?: string;
  lng?: string;
  radius?: string;
  categoryId?: string;
}

export const getDiscountedVendors = async (params: DiscountedVendorListParams) => {
  const res = await api.get("/vendor/discounted-products", {
    params: {
      page: params.page || 1,
      limit: params.limit || 10,
      lat: params.lat,
      lng: params.lng,
      radius: params.radius,
      categoryId: params.categoryId,
    },
  });

  return res.data.data;
};

export const useGetDiscountedVendors = (params: DiscountedVendorListParams = {}) => {
  return useQuery({
    queryKey: ["discountedVendors", params],
    queryFn: () => getDiscountedVendors(params),
  });
};
