import { useApi } from "@/lib/api";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const ProcessingOrderScreen = () => {
  const { paymentIntent } = useLocalSearchParams();
  const [orderId, setOrderId] = useState(null);
  const api = useApi();

  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const { data } = await api.post("/orders/payment-intent", {
          paymentIntent,
        });

        if (data?.id) {
          setOrderId(data.id);
          clearInterval(interval);
        }
      } catch (err) {
        console.log(err);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [paymentIntent]);

  useEffect(() => {
    if (orderId) {
      router.push(`/(root)/(map-followup)/${orderId}`);
    }
  }, [orderId]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={24} color="#000" />
      <Text>Estamos procesando tu orden...</Text>
    </View>
  );
};

export default ProcessingOrderScreen;
