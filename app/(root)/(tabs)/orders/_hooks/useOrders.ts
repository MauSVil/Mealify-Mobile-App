import { useApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useOrders = () => {
  const api = useApi();

  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data } = await api.get("/orders");
      return data;
    },
  });
  return {
    ordersQuery,
  };
};
