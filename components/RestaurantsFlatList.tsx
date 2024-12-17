import { Text, FlatList, View } from "react-native";
import React from "react";
import RestaurantCard from "./RestaurantCard";

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

  if (restaurants.length === 0) {
    return null;
  }

  return (
    <>
      <Text className="mx-5 font-JakartaBold text-xl mb-4">{title}</Text>
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
