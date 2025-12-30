import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await api.get("/auth/me/");
      return res.data;
    },
    retry: false,
    staleTime: Infinity,
  });
};
