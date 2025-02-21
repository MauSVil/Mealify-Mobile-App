import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { router } from "expo-router";
import moment from "moment";

const OrderCard = (props: { order: any }) => {
  const { order } = props;

  return (
    <TouchableOpacity
      className="mb-4 bg-neutral-100 rounded-md flex-row flex gap-3 justify-between"
      onPress={() => router.push(`/(root)/(map-followup)/${order.id}`)}
    >
      <View className="flex flex-col gap-1 pr-6 pl-3 py-4 flex-1">
        <Text className="font-JakartaBold text-lg" numberOfLines={1}>
          {order?.restaurants?.name}
        </Text>
        <View className="flex-row gap-1 flex-wrap">
          <Text className="text-sm font-JakartaSemiBold text-neutral-500">
            Fecha de creación:
          </Text>
          <Text className="text-sm font-JakartaRegular text-neutral-500">
            {moment(order?.created_at).format("DD/MM/YYYY HH:mm")}
          </Text>
        </View>
        <View className="flex-row gap-1">
          <Text className="text-sm font-JakartaSemiBold text-neutral-500">
            Estado:
          </Text>
          <Text className="text-sm font-JakartaRegular text-neutral-500">
            {order?.status}
          </Text>
        </View>
      </View>
      <Image
        source={{ uri: order.restaurants?.hero_image_min }}
        className="h-full w-2/5 bg-gray-300 rounded-md"
      />
    </TouchableOpacity>
  );
};

export default OrderCard;
