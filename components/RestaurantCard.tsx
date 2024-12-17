import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { router } from "expo-router";

const RestaurantCard = ({ item }: { item: any }) => {
  return (
    <Pressable
      className="ml-5 mb-6 shadow-sm w-[200px] relative"
      onPress={() => router.push("/1")}
    >
      <Image
        source={{ uri: item.heroImage }}
        className="h-[100px] w-full mb-3 rounded-md"
      />
      <TouchableOpacity className="absolute right-3 top-3 bg-white rounded-full w-8 h-8 flex items-center justify-center">
        <Image source={icons.star} className="w-4 h-4" tintColor="#000" />
      </TouchableOpacity>
      <View className="flex flex-col">
        <Text>{item.name}</Text>
        <Text className="text-general-200">Costo de envio: MXN15</Text>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
