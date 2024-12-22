import { useApi } from "@/lib/api";
import { useLocationStore } from "@/store/locationStore";
import { useQuery } from "@tanstack/react-query";

export const useRestaurants = () => {
  const api = useApi();
  const { userLatitude, userLongitude } = useLocationStore();

  const restaurantsQuery = useQuery({
    queryKey: ["restaurants", userLatitude, userLongitude],
    queryFn: async () => {
      const { data } = await api.get(
        `/restaurants/${userLatitude}/${userLongitude}`,
      );
      return data;
    },
  });

  return {
    restaurantsQuery,
  };
};
