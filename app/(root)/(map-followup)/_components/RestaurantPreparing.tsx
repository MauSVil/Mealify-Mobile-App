import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { ActivityIndicator, Image, Text, View } from "react-native";

const RestaurantPreparing = ({ data }: { data: any }) => {
  return (
    <BottomSheet snapPoints={["35%", "65%"]}>
      <BottomSheetView style={{ flex: 1, padding: 20 }}>
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-JakartaExtraBold max-w-[70%]">
            El restaurante está preparando tu pedido...
          </Text>
          <ActivityIndicator size={40} color="#000" />
        </View>

        <Text className="text-xl mb-2 mt-10 font-JakartaSemiBold">
          Resumen de tu pedido
        </Text>

        <View className="w-full h-[2px] mb-6 bg-general-100" />

        {(data.order_items || []).map((item: any) => (
          <View
            className="w-full bg-white mb-5 flex flex-row justify-between items-center gap-4 relative"
            key={item.id}
          >
            <Text className="text-base font-Jakarta" numberOfLines={1}>
              x {item.quantity}
            </Text>
            <View className="flex flex-col max-w-[50%]">
              <Text className="text-lg font-JakartaBold" numberOfLines={1}>
                {item.products.name}
              </Text>
              <Text className="text-base font-Jakarta" numberOfLines={3}>
                {item.products.description}
              </Text>
            </View>
            <Image
              source={{ uri: item.products.image_min }}
              className="w-[100px] h-[100px] rounded-xl"
            />
          </View>
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
};

export default RestaurantPreparing;
