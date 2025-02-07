import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const PendingOrder = () => {
  return (
    <>
      <View className="flex flex-row justify-between items-center">
        <Text className="text-2xl font-JakartaExtraBold max-w-[70%]">
          Estamos esperando que el restaurante acepte tu pedido...
        </Text>
        <ActivityIndicator size={40} color="#000" />
      </View>
    </>
  );
};

export default PendingOrder;
