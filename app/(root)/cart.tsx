import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import { router } from "expo-router";
import CartCard from "@/components/CartCard";
import { cartStore } from "@/store/cartStore";
import CustomButton from "@/components/CustomButton";
import { StripeProvider, usePaymentSheet } from "@stripe/stripe-react-native";
import { useApi } from "@/lib/api";
import { useUser } from "@clerk/clerk-expo";
import { useLocationStore } from "@/store/locationStore";

const Cart = () => {
  const api = useApi();
  const { user } = useUser();
  const [ready, setReady] = useState(false);
  const { cart, clearCart } = cartStore();
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();
  const { userLatitude, userLongitude } = useLocationStore();
  const [paymentIntent, setPaymentIntent] = useState("");

  const total = Object.values(cart).reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0,
  );

  const initializePaymentSheet = async () => {
    try {
      setReady(false);
      const { data } = await api.post("/payments/fetch-params", {
        email: user?.emailAddresses[0].emailAddress!,
        amount: total,
        restaurant: Object.values(cart)[0].restaurant_id,
        userLatitude,
        userLongitude,
        clerkId: user?.id,
        cart,
      });
      const { paymentIntent, paymentIntentId, ephemeralKey, customer } = data;

      setPaymentIntent(paymentIntentId);

      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        merchantDisplayName: "Mealify Inc.",
        returnURL: "myapp://book-ride",
      });

      if (error) {
        Alert.alert(`${error.code}`, error.message);
      } else {
        setReady(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
    if (error) {
      Alert.alert(`${error.code}`, error.message);
    } else {
      setReady(false);
      clearCart();
      router.push(`/(root)/(map-followup)/payment-intent/${paymentIntent}`);
    }
  };

  useEffect(() => {
    if (total > 0) initializePaymentSheet();
  }, [total]);

  return (
    <StripeProvider
      publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      merchantIdentifier="merchant.uber.com"
      urlScheme="myapp"
    >
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
          <CustomButton
            title="Pagar"
            disabled={Object.values(cart).length === 0 || loading || !ready}
            onPress={openPaymentSheet}
          />
        </View>
      </SafeAreaView>
    </StripeProvider>
  );
};

export default Cart;
