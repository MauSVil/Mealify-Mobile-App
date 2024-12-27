import React, { useEffect, useMemo, useRef } from "react";
import Map from "@/components/Map";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { icons } from "@/constants";
import { router, useLocalSearchParams } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useOrder } from "./_hooks/useOrder";
import socketService from "@/socketService";
import RestaurantPreparing from "./_components/RestaurantPreparing";
import ReadyForPickup from "./_components/ReadyForPickup";

const MapFollowUp = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { orderId } = useLocalSearchParams();

  if (!orderId) router.dismiss();

  useEffect(() => {
    const socket = socketService.getSocket();
    if (socket) socketService.joinRoom(orderId as string);
    return () => {
      socketService.disconnect();
    };
  }, []);

  const { orderQuery, candidatesQuery } = useOrder(orderId as string);

  if (orderQuery.isLoading || candidatesQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={24} color="#000" />
      </View>
    );
  }

  const component: Record<string, React.ReactElement> = {
    preparing: <RestaurantPreparing data={orderQuery.data} />,
    ready_for_pickup: <ReadyForPickup data={orderQuery.data} />,
  };

  const BottomSheetContent = component[orderQuery.data.status];

  return (
    <GestureHandlerRootView>
      <View className="flex-1 relative">
        <View className="absolute top-20 w-full px-10 flex justify-between flex-row items-center">
          <TouchableOpacity
            className="bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center z-10"
            onPress={() => router.dismiss()}
          >
            <Image source={icons.close} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity className="z-10 px-3 py-1 bg-white rounded-2xl items-center">
            <Text className="text-base font-JakartaLight">Ayuda</Text>
          </TouchableOpacity>
        </View>
        <Map
          latitude={orderQuery.data.latitude}
          longitude={orderQuery.data.longitude}
          markers={
            candidatesQuery.data?.map((candidate: any) => ({
              id: candidate.id,
              latitude: candidate.latitude,
              longitude: candidate.longitude,
              title: candidate.name,
              description: candidate.phone,
            })) || []
          }
        />
        <BottomSheet ref={bottomSheetRef} snapPoints={["30%", "85%"]} index={1}>
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {BottomSheetContent}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default MapFollowUp;
