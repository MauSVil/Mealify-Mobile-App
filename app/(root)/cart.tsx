import {
  Alert,
  FlatList,
  Image,
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
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";
import { useApi } from "@/lib/api";
import { useUser } from "@clerk/clerk-expo";
import { useLocationStore } from "@/store/locationStore";

const Cart = () => {
  const api = useApi();
  const { user } = useUser();
  const { cart, clearCart } = cartStore();
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { userLatitude, userLongitude } = useLocationStore();
  // const [success, setSuccess] = useState(false);

  const total = Object.values(cart).reduce(
    (acc, { price, quantity }) => acc + price * quantity,
    0,
  );

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Mealify Inc.",
      intentConfiguration: {
        mode: {
          amount: total * 100,
          currencyCode: "mxn",
        },
        confirmHandler: async (paymentMethod, _, intentCreationCallback) => {
          const { data } = await api.post("/payments/payment-intent", {
            name:
              user?.fullName ||
              user?.emailAddresses[0].emailAddress!.split("@")[0],
            email: user?.emailAddresses[0].emailAddress!,
            amount: total,
            restaurant: Object.values(cart)[0].restaurant_id,
            userLatitude,
            userLongitude,
          });

          const { customer, paymentIntent: paymentIntentResp } = data;
          const { paymentIntent } = paymentIntentResp;

          const { client_secret } = paymentIntent;

          if (client_secret) {
            const { data } = await api.post("/payments/pay", {
              payment_method_id: paymentMethod.id,
              payment_intent_id: paymentIntent.id,
              customer_id: customer,
            });
            const { result } = data;
            if (result.client_secret) {
              // Add to DB
              intentCreationCallback({
                clientSecret: result.client_secret,
              });

              clearCart();
              router.push("/(root)/map-followup");
            }
          }
        },
      },
      returnURL: "myapp://book-ride",
    });
  };

  const openPaymentSheet = async () => {
    await initializePaymentSheet();
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`${error.code}`, error.message);
    } else {
      // setSuccess(true);
    }
  };

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
            title={`Pagar $${total}`}
            disabled={Object.values(cart).length === 0}
            onPress={openPaymentSheet}
          />
        </View>
      </SafeAreaView>
    </StripeProvider>
  );
};

export default Cart;
