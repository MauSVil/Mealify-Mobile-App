import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(address)/index"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(restaurantId)/[restaurantId]"
        options={{ headerShown: false, gestureDirection: "vertical" }}
      />
      <Stack.Screen name="cart" options={{ headerShown: false }} />
      <Stack.Screen
        name="(map-followup)/[orderId]"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(map-followup)/payment-intent/[paymentIntent]"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default Layout;
