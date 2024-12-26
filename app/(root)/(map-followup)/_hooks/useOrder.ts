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

  return {
    orderQuery,
  };
};
