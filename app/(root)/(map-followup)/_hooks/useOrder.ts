import { useApi } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

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

  const orderMutation = useMutation({
    mutationKey: ["order", id],
    mutationFn: async (data: any) => {
      const resp = await api.put("/orders", data);
      return resp.data;
    },
  });

  return {
    orderQuery,
    candidatesQuery,

    orderMutation,
  };
};
