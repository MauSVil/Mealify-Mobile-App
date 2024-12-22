import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { cartStore } from "@/store/cartStore";
import { Product } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";

const ProductCard = ({ item }: { item: Product }) => {
  const { cart, addProduct, removeProduct } = cartStore();

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
      {cart[item.id]?.quantity > 0 ? (
        <View className="w-[110px] flex flex-row justify-between absolute bottom-3 right-3">
          <View className="bg-white w-8 h-8 flex items-center justify-center rounded-full">
            <TouchableOpacity onPress={() => removeProduct(String(item.id))}>
              <Ionicons name="remove" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="bg-white w-8 h-8 flex items-center justify-center rounded-full">
            <Text className="font-JakartaMedium">{cart[item.id].quantity}</Text>
          </View>
          <View className="bg-white w-8 h-8 flex items-center justify-center rounded-full">
            <TouchableOpacity
              onPress={() => addProduct({ ...item, quantity: 1 })}
            >
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="bg-white w-8 h-8 flex items-center justify-center absolute bottom-3 right-3 rounded-full">
          <TouchableOpacity
            onPress={() => addProduct({ ...item, quantity: 1 })}
          >
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductCard;
