import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import React from "react";

const RestaurantDelayed = () => {
  return (
    <>
      <View className="flex flex-row justify-between items-center mb-8">
        <View className="flex flex-col gap-3 max-w-[70%]">
          <Text className="text-2xl font-JakartaExtraBold">
            El restaurante se está demorando en preparar tu pedido
          </Text>
          <Text className="text-base text-gray-600">
            Estamos trabajando para solucionarlo.
          </Text>
        </View>
        <ActivityIndicator size={40} color="#000" />
      </View>
      <TouchableOpacity className="bg-red-500 p-3 rounded-2xl items-center justify-center">
        <Text className="text-white text-base font-JakartaBold">
          Cancelar pedido
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default RestaurantDelayed;
