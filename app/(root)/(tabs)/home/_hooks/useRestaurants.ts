import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export const useRestaurants = () => {
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
