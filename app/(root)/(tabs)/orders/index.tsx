import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, RefreshControl, StatusBar, Text, View } from "react-native";
import OrderCard from "@/components/OrderCard";
import { useMemo } from "react";
import { useOrders } from "@/hooks/useOrders";

const OrdersScreen = () => {
  const { ordersQuery } = useOrders();

  const content = useMemo(() => {
    if (ordersQuery.isLoading || ordersQuery.isRefetching) {
      return Array.from({ length: 7 }).map((_, index) => (
        <View key={index} className="mb-3 h-36 flex flex-row gap-3 rounded-md">
          <View className="w-2/3 bg-gray-200 h-full" />
          <View className="w-1/3 bg-gray-200 h-full" />
        </View>
      ));
    }
    return (
      <FlatList
        data={ordersQuery.data || []}
        renderItem={({ item }) => <OrderCard order={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={ordersQuery.isRefetching}
            onRefresh={() => ordersQuery.refetch()}
          />
        }
      />
    );
  }, [ordersQuery.isLoading, ordersQuery.isRefetching]);

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <View className="mx-6">
        <View className="py-6">
          <Text className="font-JakartaBold text-2xl">Ordenes</Text>
        </View>
        {content}
      </View>
      <StatusBar barStyle={"dark-content"} />
    </SafeAreaView>
  );
};

export default OrdersScreen;
