import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const InProgress = ({ data }: { data: any }) => {
  const { delivery_drivers } = data;
  return (
    <>
      <View className="flex flex-row justify-between items-center">
        <Text className="text-2xl font-JakartaExtraBold max-w-[70%]">
          El repartidor está en camino por tu pedido
        </Text>
        <ActivityIndicator size={40} color="#000" />
      </View>
      <View className="py-10 flex flex-row gap-10">
        <View className="w-20 h-20 bg-gray-200 rounded-full border-black border-solid border-2" />
        <View className="flex flex-col">
          <Text className="text-xl font-JakartaBold">
            {delivery_drivers.name}
          </Text>
          <View className="flex flex-row gap-1">
            <Text className="text-lg font-JakartaBold">Tipo de vehículo:</Text>
            <Text className="text-lg font-JakartaRegular">
              {delivery_drivers.vehicle_type}
            </Text>
          </View>
          <View className="flex flex-row gap-1">
            <Text className="text-lg font-JakartaBold">Placa:</Text>
            <Text className="text-lg font-JakartaRegular">
              {delivery_drivers.license_plate}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default InProgress;
