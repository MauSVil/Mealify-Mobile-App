import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

const RestaurantCard = ({ item }: { item: any }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Pressable
      className="ml-5 mb-6 shadow-sm w-[200px] relative"
      onPress={() => router.push(`/(restaurantId)/${item.id}`)}
    >
      <View
        className={`h-[100px] w-full mb-3 rounded-md bg-general-100 ${isLoading ? "animate-pulse" : ""}`}
      >
        <Image
          source={{ uri: item.hero_image }}
          className="h-full w-full"
          onLoadEnd={() => setIsLoading(false)}
        />
      </View>
      {item.premium && (
        <View className="absolute right-3 top-3 bg-blue-700 rounded-full flex items-center justify-center px-2 py-1 shadow-sm shadow-neutral-400/70">
          <Text className="text-white">Premium</Text>
        </View>
      )}
      <View className="flex flex-col">
        <Text>{item.name}</Text>
        <Text className="text-general-200">
          Costo de envio: MXN{item.delivery_fee}
        </Text>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
