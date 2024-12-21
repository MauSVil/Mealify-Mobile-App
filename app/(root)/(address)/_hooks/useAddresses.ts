import { useApi } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddresses = () => {
  const api = useApi();
  const getAddressesQuery = useQuery({
    queryKey: ["addresses"],
    queryFn: async () => {
      const { data } = await api.get("/user-addresses");
      return data;
    },
  });

  const addAddressMutation = useMutation({
    mutationFn: async (address: any) => {
      const { data } = await api.post("/user-addresses", address);
      return data;
    },
  });

  return {
    getAddressesQuery,
    addAddressMutation,
  };
};
