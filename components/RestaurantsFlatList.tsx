import { Text, FlatList, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import RestaurantCard from "./RestaurantCard";
import { icons } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

const RestaurantsFlatList = ({
  title,
  restaurants,
  loading,
}: {
  title: string;
  restaurants: any[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <>
        <Text className="mx-5 font-JakartaBold text-xl mb-4">{title}</Text>
        <FlatList
          horizontal
          data={[1, 2, 3, 4, 5]}
          renderItem={({ item }) => (
            <View className="h-[100px] ml-5 mb-6 shadow-sm w-[200px] rounded-md animate-pulse bg-general-100" />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </>
    );
  }

  if (!restaurants || restaurants.length === 0) {
    return null;
  }

  return (
    <>
      <View className="w-full justify-between items-center flex- flex-row mb-4 pr-7">
        <Text className="mx-5 font-JakartaBold text-xl">{title}</Text>
        <TouchableOpacity className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
          <Ionicons name="arrow-forward" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={restaurants}
        renderItem={({ item }) => <RestaurantCard item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default RestaurantsFlatList;
