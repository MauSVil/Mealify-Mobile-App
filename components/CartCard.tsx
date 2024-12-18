import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { CartProduct } from "@/types/type";
import { icons } from "@/constants";
import { cartStore } from "@/store/cartStore";

const CartCard = ({ item }: { item: CartProduct }) => {
  const { cart, removeProduct, addProduct } = cartStore();
  return (
    <View className="bg-white min-h-40 rounded-xl mb-4 shadow-neutral-400/70 shadow-sm flex flex-row justify-between">
      <View className="p-4 flex flex-col w-1/2">
        <Text className="font-JakartaBold text-lg">{item.name}</Text>
        <View className="flex flex-row gap-1">
          <Text className="font-JakartaSemiBold text-base text-general-200">
            Piezas:
          </Text>
          <Text className="font-Jakarta text-base text-general-200">
            {item.quantity}
          </Text>
        </View>
        <View className="flex flex-row gap-1">
          <Text className="font-JakartaSemiBold text-base text-general-200">
            Total:
          </Text>
          <Text className="font-Jakarta text-base text-general-200">
            ${item.price * item.quantity}
          </Text>
        </View>
      </View>
      <Image
        source={{ uri: item.image }}
        className="w-1/2 h-full rounded-r-xl"
      />
      {cart[item.id]?.quantity > 0 ? (
        <View className="w-[110px] flex flex-row justify-between absolute bottom-3 right-3">
          <View className="bg-white w-8 h-8 flex items-center justify-center rounded-full">
            <TouchableOpacity onPress={() => removeProduct(String(item.id))}>
              <Image
                source={icons.checkmark}
                className="h-4 w-4"
                tintColor="#000"
              />
            </TouchableOpacity>
          </View>
          <View className="bg-white w-8 h-8 flex items-center justify-center rounded-full">
            <Text className="font-JakartaMedium">{cart[item.id].quantity}</Text>
          </View>
          <View className="bg-white w-8 h-8 flex items-center justify-center rounded-full">
            <TouchableOpacity
              onPress={() => addProduct({ ...item, quantity: 1 })}
            >
              <Image
                source={icons.checkmark}
                className="h-4 w-4"
                tintColor="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="bg-white w-8 h-8 flex items-center justify-center absolute bottom-3 right-3 rounded-full">
          <TouchableOpacity
            onPress={() => addProduct({ ...item, quantity: 1 })}
          >
            <Image
              source={icons.checkmark}
              className="h-4 w-4"
              tintColor="#000"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartCard;
