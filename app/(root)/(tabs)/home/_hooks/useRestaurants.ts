import { useQuery } from "@tanstack/react-query";

const restaurants = [
  {
    name: "Toks",
    owner: "67267e606f23501d502d8733",
    description: "En Toks, estar aqui, esta mejor",
    phone: "5521225727",
    heroImage:
      "https://minio.mausvil.dev/businesses/6721071e367470be50b03190.png",
    latitude: 19.503706926529006,
    longitude: -99.2489755153656,
    deletedAt: null,
    stripeAccountId: "acct_1QFHwyD5KLGk800D",
    premium: true,
    category: "Mexican",
  },
  {
    name: "La casa de Toño",
    owner: "67267e606f23501d502d8733",
    description: "La casa de todos",
    phone: "5593314671",
    heroImage:
      "https://minio.mausvil.dev/businesses/67210f7afbd3a0f9459c9f46.jpeg",
    latitude: 19.504829489420416,
    longitude: -99.24781411886215,
    deletedAt: null,
    stripeAccountId: "acct_1QFIRPD5634jj3jJ",
    premium: false,
    category: "Mexican",
  },
  {
    name: "Mr. Sushi",
    owner: "67267e606f23501d502d8733",
    description: "Mr. Sushi",
    phone: "5535209307",
    heroImage:
      "https://minio.mausvil.dev/businesses/6725aefdf11f4e9bb17ffa2e.jpeg",
    latitude: 19.50593458423688,
    longitude: -99.24684019906286,
    deletedAt: null,
    stripeAccountId: null,
    premium: false,
    category: "Asian",
  },
  {
    name: "Hamburguesas",
    owner: "67267e606f23501d502d8733",
    description: "Las mejores hamburguesas",
    phone: "5535209307",
    heroImage:
      "https://minio.mausvil.dev/businesses/673ae9aa5e0b01a8375be6bd.jpeg",
    latitude: 19.93528388372327,
    longitude: -99.52373778782551,
    deletedAt: null,
    category: "Mexican",
    premium: false,
  },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useRestaurants = () => {
  const restaurantsQuery = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      await sleep(4000);
      return restaurants;
    },
  });
  return {
    restaurantsQuery,
  };
};
