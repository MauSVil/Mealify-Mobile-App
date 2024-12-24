import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import ProductCard from "@/components/ProductCard";
import { useRestaurant } from "./_hooks/useRestaurant";
import { Ionicons } from "@expo/vector-icons";

const RestaurantScreen = () => {
  const { restaurantId } = useLocalSearchParams();
  const { singleRestaurantQuery, productsQuery } = useRestaurant(
    Number(restaurantId),
  );
  const restaurantInfo = singleRestaurantQuery.data;

  return (
    <View className="flex-1 items-center bg-general-500 relative">
      <Image
        source={{
          uri: restaurantInfo?.hero_image_min,
        }}
        className="w-full h-48 bg-general-100"
      />
      <View className="flex flex-row absolute top-16 left-10 items-center">
        <TouchableOpacity
          className="bg-white items-center justify-center rounded-full w-10 h-10"
          onPress={() => router.dismiss()}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image
        className="rounded-full bg-general-100 w-20 h-20 top-36 absolute border-white border-2 shadow-md shadow-neutral-400/70 z-10"
        source={{
          uri: restaurantInfo?.hero_image_min,
        }}
      />
      <View className="h-14 w-full" />

      <View className="flex-1 w-full px-10">
        <FlatList
          data={productsQuery.data || []}
          renderItem={({ item }) => <ProductCard item={item} />}
          ListHeaderComponent={
            <View className="mb-10">
              <Text
                className="font-JakartaExtraBold text-2xl"
                numberOfLines={1}
              >
                {restaurantInfo?.name}
              </Text>
              <Text
                className="font-Jakarta text-xl text-general-200"
                numberOfLines={2}
              >
                {restaurantInfo?.phone}
              </Text>
            </View>
          }
        />
      </View>
    </View>
  );
};

export default RestaurantScreen;
