import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Text, View } from "react-native";
import { useOrders } from "./_hooks/useOrders";
import OrderCard from "@/components/OrderCard";

const OrdersScreen = () => {
  const { ordersQuery } = useOrders();

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <View className="mx-6">
        <View className="py-6">
          <Text className="font-JakartaBold text-2xl">Ordenes</Text>
        </View>
        <FlatList
          data={ordersQuery.data || []}
          renderItem={({ item }) => <OrderCard order={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrdersScreen;
