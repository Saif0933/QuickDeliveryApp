import { useInfiniteQuery } from "@tanstack/react-query";
import { Vendor } from "../../types/Vender.types";
import api from "../api";

export interface VendorResponse {
  vendors: Vendor[];
  TotalVendors: number;    
  totalPages: number;         
  currentPage: number;       
  count: number;             
}

export interface VendorListParams {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}

export const getVendors = async ({
  page,
  limit,
  search = "",
  status = "APPROVED",
}: VendorListParams) => {
  const res = await api.get("/vendor/all", {
    params: {
      page,
      limit,
      search,
      status,
    },
  });

  return res.data.data as VendorResponse;
};


type UseInfiniteVendorsParams = Omit<VendorListParams, "page">;

export const useGetAllVendors = (params: UseInfiniteVendorsParams) => {
  return useInfiniteQuery({
    queryKey: ["vendors", "infinite", params],

    queryFn: ({ pageParam }) =>
      getVendors({
        page: pageParam,
        ...params,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });
};