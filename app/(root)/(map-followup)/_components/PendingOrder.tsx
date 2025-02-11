import { View, Text, ActivityIndicator, Image } from "react-native";
import React from "react";

const PendingOrder = ({ data }: { data: any }) => {
  return (
    <>
      <View className="flex flex-row justify-between items-center">
        <Text className="text-2xl font-JakartaExtraBold max-w-[70%]">
          Estamos esperando que el restaurante acepte tu pedido...
        </Text>
        <ActivityIndicator size={40} color="#000" />
      </View>
      <View className="mt-10 flex flex-row gap-3">
        <View className="flex-1">
          <Text className="text-lg font-JakartaBold">
            {data?.restaurants?.name}
          </Text>
          <Text className="text-base text-gray-500">
            {data?.restaurants?.category}
          </Text>

          <Text className="text-base text-gray-500">
            {data?.restaurants?.phone}
          </Text>
        </View>
        <Image
          source={{ uri: data?.restaurants?.hero_image_med }}
          className="flex-1 h-24 rounded-md opacity-85"
        />
      </View>
    </>
  );
};

export default PendingOrder;
