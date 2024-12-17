import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router } from "expo-router";
import ProductCard from "@/components/ProductCard";

const products = [
  {
    name: "Sarteneta Mexicana",
    description:
      "Incluye salsa norteña, dos tacos de chile relleno, queso panela dorado, y tres doradas de huitlacoche y guacamole.",
    price: 300,
    available: true,
    image: "https://minio.mausvil.dev/products/672109fd367470be50b03191.png",
    createdAt: "2024-10-29T16:14:53.321Z",
    updatedAt: "2024-10-29T16:14:53.321Z",
    deletedAt: null,
    restaurantId: "6721071e367470be50b03190",
  },
  {
    name: "Arrachera estilo Toks",
    description:
      "Jugosa y suave Arrachera (200 g) cocinada a la parrilla al estilo Toks, acompañada de papas fritas y chiles toreados.",
    price: 420,
    available: true,
    image: "https://minio.mausvil.dev/products/67210a45367470be50b03192.png",
    createdAt: "2024-10-29T16:16:05.371Z",
    updatedAt: "2024-10-29T16:16:05.371Z",
    deletedAt: null,
    restaurantId: "6721071e367470be50b03190",
  },
  {
    name: "Mr. Tam beef",
    description:
      "Cubierta de empanizado, aguacate y tampico, relleno de queso crema, aguacate y filete de res.",
    price: 255,
    available: true,
    image: "https://minio.mausvil.dev/products/6725b0b3f11f4e9bb17ffa2f.webp",
    deletedAt: null,
    restaurantId: "6725aefdf11f4e9bb17ffa2e",
  },
  {
    name: "Pozole",
    description: "Un rico pozole",
    price: 150,
    available: true,
    image: "https://minio.mausvil.dev/products/6725b103f11f4e9bb17ffa30.jpeg",
    createdAt: "2024-11-02T04:56:35.417Z",
    updatedAt: "2024-11-02T04:56:35.417Z",
    deletedAt: null,
    restaurantId: "67210f7afbd3a0f9459c9f46",
  },
  {
    name: "King de pollo",
    description: "Un king pero de pollo",
    price: 120,
    available: true,
    image: "https://minio.mausvil.dev/products/673bca4c90b0966ac998ff1f.jpeg",
    deletedAt: null,
    restaurantId: "673ae9aa5e0b01a8375be6bd",
  },
];

const RestaurantScreen = () => {
  return (
    <View className="flex-1 items-center bg-general-500 relative">
      <Image
        source={{
          uri: "https://minio.mausvil.dev/businesses/67210f7afbd3a0f9459c9f46.jpeg",
        }}
        className="w-full h-48"
      />
      <View className="flex flex-row absolute top-16 left-10 items-center">
        <TouchableOpacity
          className="bg-white items-center justify-center rounded-full w-10 h-10"
          onPress={() => router.dismiss()}
        >
          <Image source={icons.close} className="w-6 h-6" tintColor="#000" />
        </TouchableOpacity>
      </View>
      <Image
        className="rounded-full bg-white w-20 h-20 top-36 absolute border-white border-2 shadow-md shadow-black z-10"
        source={{
          uri: "https://minio.mausvil.dev/businesses/67210f7afbd3a0f9459c9f46.jpeg",
        }}
      />
      <View className="h-14 w-full" />

      <View className="flex-1 w-full px-10">
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductCard item={item} />}
          ListHeaderComponent={
            <View className="mb-10">
              <Text
                className="font-JakartaExtraBold text-2xl"
                numberOfLines={1}
              >
                La casa de Toño (ZONA AZUL)
              </Text>
              <Text
                className="font-Jakarta text-xl text-general-200"
                numberOfLines={2}
              >
                La casa de todos
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default RestaurantScreen;
