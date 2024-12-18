import {
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import { router } from "expo-router";
import CartCard from "@/components/CartCard";
import { cartStore } from "@/store/cartStore";
import CustomButton from "@/components/CustomButton";

const Cart = () => {
  const { cart, clearCart } = cartStore();

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <View className="w-full mx-10">
        <TouchableOpacity
          className="justify-center items-center w-10 h-10 rounded-full bg-white"
          onPress={() => router.dismiss()}
        >
          <Image
            source={icons.backArrow}
            className="w-4 h-4"
            tintColor="#000"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        className="mx-10 py-5"
        ListHeaderComponent={
          <View className="w-full justify-between flex flex-row items-center mb-10">
            <Text className="text-3xl font-JakartaExtraBold">Carrito</Text>
            <TouchableOpacity
              onPress={() => {
                clearCart();
                router.dismiss();
              }}
            >
              <Text>Limpiar</Text>
            </TouchableOpacity>
          </View>
        }
        data={Object.values(cart)}
        renderItem={({ item }) => <CartCard item={item} />}
      />
      <View className="w-10/12 mx-10">
        <CustomButton title="Comprar" />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
