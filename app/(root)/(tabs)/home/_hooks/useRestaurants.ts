import { useApi } from "@/lib/api";
import _ from "lodash";
import { useLocationStore } from "@/store/locationStore";
import { useQuery } from "@tanstack/react-query";

export const useRestaurants = () => {
  const api = useApi();
  const { userLatitude, userLongitude } = useLocationStore();

  const restaurantsQuery = useQuery<Record<string, any[]>>({
    queryKey: ["restaurants", userLatitude, userLongitude],
    queryFn: async () => {
      const { data } = await api.get(
        `/restaurants/${userLatitude}/${userLongitude}`,
      );

      const restaurantsByCategory = _.groupBy(data, "category");

      return {
        all: data,
        ...restaurantsByCategory,
      };
    },
  });

  return {
    restaurantsQuery,
  };
};
