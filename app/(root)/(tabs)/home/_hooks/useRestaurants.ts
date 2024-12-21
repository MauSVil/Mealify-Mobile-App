import { useApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useRestaurants = () => {
  const api = useApi();
  const restaurantsQuery = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data } = await api.get("/restaurants");
      return data;
    },
  });
  return {
    restaurantsQuery,
  };
};
