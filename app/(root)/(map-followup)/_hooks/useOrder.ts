import { useApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useOrder = (id: number | string) => {
  const api = useApi();

  const orderQuery = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const { data } = await api.get(`/orders/${id}`);
      return data;
    },
  });

  const candidatesQuery = useQuery({
    queryKey: ["order", id, "candidates"],
    queryFn: async () => {
      const { data } = await api.get(`/delivery-drivers/candidates/${id}`);
      return data;
    },
  });

  return {
    orderQuery,
    candidatesQuery,
  };
};
