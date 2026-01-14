import { useQuery } from "@tanstack/react-query";
import api from "../api";

/* ===================== TYPES ===================== */

export interface EliteMembershipDetails {
  id: number;
  name: string;
  description?: string;
  price: number;
  validityInDays: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EliteMembershipResponse {
  success: boolean;
  message: string;
  data: EliteMembershipDetails;
}

export const getEliteMembershipDetails = async (): Promise<EliteMembershipDetails> => {
  const res = await api.get("/user/elite-membership/details");
  return res.data.data;
};

export const useGetEliteMembershipDetails = () => {
  return useQuery({
    queryKey: ["elite-membership-details"],
    queryFn: getEliteMembershipDetails,
  });
};
