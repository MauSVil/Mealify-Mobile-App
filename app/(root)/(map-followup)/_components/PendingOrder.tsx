import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useOrder } from "../_hooks/useOrder";
import { router } from "expo-router";

const PendingOrder = ({ data }: { data: any }) => {
  const { orderMutation } = useOrder(data?.id);

  const onClick = async () => {
    await orderMutation.mutateAsync({
      id: data?.id,
      status: "cancelled_by_user",
    });
    router.replace("/orders");
  };

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
      <TouchableOpacity
        className="bg-red-500 p-3 rounded-2xl items-center justify-center mt-8"
        onPress={onClick}
      >
        <Text className="text-white text-base font-JakartaBold">
          Cancelar pedido
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default PendingOrder;
