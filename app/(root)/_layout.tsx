import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="address"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[restaurantId]"
        options={{ headerShown: false, gestureDirection: "vertical" }}
      />
      <Stack.Screen name="cart" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
