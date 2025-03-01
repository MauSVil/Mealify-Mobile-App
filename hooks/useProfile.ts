import { useApi } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export const useProfile = ({ id }: { id: string }) => {
  const api = useApi();

  const profileQuery = useQuery({
    queryKey: ["profile", id],
    queryFn: async () => {
      const { data } = await api.get(`/users/clerk/${id}`);
      return data;
    },
  });

  return {
    localStore: {
      profile: profileQuery.data || {},
    },
    flags: {
      isLoading: profileQuery.isLoading,
      isError: profileQuery.isError,
    },
  };
};
