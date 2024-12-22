import { useApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useRestaurant = (id: number) => {
  const api = useApi();

  const singleRestaurantQuery = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const { data } = await api.get(`/restaurants/${id}`);
      return data;
    },
  });

  const productsQuery = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data } = await api.get(`/products/restaurant/${id}`);
      return data;
    },
  });

  return {
    singleRestaurantQuery,
    productsQuery,
  };
};
