import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../api";
import { Order } from "../../types/order";

/**
 * API response type (same structure as Vendor)
 */
export interface OrderResponse {
    orders: Order[];
    totalOrders: number;
    totalPages: number;
    currentPage: number;
    count: number;
}

/**
 * Query params
 */
export interface OrderListParams {
    page: number;
    limit: number;
    search?: string;
    status?: string;
}

/**
 * API call
 */
export const getOrders = async ({
    page,
    limit,
    search = "",
    status = "",
}: OrderListParams) => {
    const res = await api.get("/user/order/all", {
        params: {
            page,
            limit,
            search,
            status,
        },
    });

    return res.data.data as OrderResponse;
};

/**
 * Infinite Query Params
 */
type UseInfiniteOrdersParams = Omit<OrderListParams, "page">;

/**
 * Infinite Query Hook
 */
export const useGetAllOrders = (params: UseInfiniteOrdersParams) => {
    return useInfiniteQuery({
        queryKey: ["orders", "infinite", params],

        queryFn: ({ pageParam }) =>
            getOrders({
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
