import { useQuery } from "@tanstack/react-query";
import api from "../api";

export interface Category {
    id: string;
    name: string;
    image?: {
        url: string;
        public_id: string;
    };
    createdAt: string;
}

export interface CategoryListParams {
    search?: string;
}

export const getAllCategory = async ({
    search = "",
}: CategoryListParams) => {
    const res = await api.get(
        "/category/all",
        {
            params: { search },
        }
    );

    return res.data.data as Category[];
};

export const useGetAllCategory = (params: CategoryListParams) => {
    return useQuery({
        queryKey: ["category", "all", params],
        queryFn: () => getAllCategory(params),
    });
};
