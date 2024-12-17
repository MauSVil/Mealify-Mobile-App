import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="[restaurantId]"
        options={{ headerShown: false, gestureDirection: "vertical" }}
      />
    </Stack>
  );
};

export default Layout;
