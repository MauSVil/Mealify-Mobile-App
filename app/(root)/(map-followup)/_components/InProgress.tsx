import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const InProgress = ({ data }: { data: any }) => {
  return (
    <>
      <View className="flex flex-row justify-between items-center">
        <Text className="text-2xl font-JakartaExtraBold max-w-[70%]">
          El repartidor está en camino por tu pedido
        </Text>
        <ActivityIndicator size={40} color="#000" />
      </View>
      <View>
        <Text>Driver</Text>
      </View>
    </>
  );
};

export default InProgress;
