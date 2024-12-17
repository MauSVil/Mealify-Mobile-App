import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";

const ProductCard = ({ item }: { item: any }) => {
  return (
    <View className="w-full bg-white mb-4 flex flex-row justify-between gap-4 relative">
      <View className="p-4 flex flex-col max-w-[50%]">
        <Text className="text-lg font-JakartaBold" numberOfLines={1}>
          {item.name}
        </Text>
        <Text className="text-base font-Jakarta" numberOfLines={2}>
          {item.description}
        </Text>
      </View>
      <Image
        source={{ uri: item.image }}
        className="w-[150px] h-[100px] rounded-xl"
      />
      <View className="bg-white w-8 h-8 flex items-center justify-center absolute bottom-3 right-3 rounded-full">
        <TouchableOpacity>
          <Image
            source={icons.checkmark}
            className="h-4 w-4"
            tintColor="#000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;
