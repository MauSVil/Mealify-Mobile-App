import React, { useEffect, useRef, useState } from "react";
import Map from "@/components/Map";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
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
import PendingOrder from "./_components/PendingOrder";
import RestaurantPreparing from "./_components/RestaurantPreparing";
import ReadyForPickup from "./_components/ReadyForPickup";
import MapView from "react-native-maps";
import { useMap } from "./_hooks/useMap";

const MapFollowUp = () => {
  const [isMapReady, setIsMapReady] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const mapRef = useRef<MapView>(null);
  const { orderId } = useLocalSearchParams();

  useEffect(() => {
    if (!orderId) {
      router.dismiss();
      return;
    }
    const socket = socketService.getSocket();
    if (!socket) return;
    socketService.joinRoom(orderId as string);

    socket.on("message", () => orderQuery.refetch());
  }, [orderId]);

  const { orderQuery, candidatesQuery } = useOrder(orderId as string);

  const { markers, origin, destination, loading } = useMap({
    data: orderQuery.data,
    isMapReady,
    candidatesData: candidatesQuery.data,
    mapRef,
    bottomSheetRef,
  });

  if (
    loading ||
    !orderId ||
    orderQuery.isLoading ||
    candidatesQuery.isLoading
  ) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={24} color="#000" />
      </View>
    );
  }

  const renderBackgroundContent = (status: string) => {
    const components: Record<string, React.ReactElement> = {
      pending: (
        <SafeAreaView className="flex flex-1 justify-center items-center">
          <Text className="font-Jakarta text-2xl" numberOfLines={2}>
            Estamos procesando tu pago
          </Text>
        </SafeAreaView>
      ),
    };
    return (
      components[status] || (
        <Map
          mapRef={mapRef}
          markers={markers}
          onMapReady={() => setIsMapReady(true)}
          origin={origin}
          destination={destination}
        />
      )
    );
  };

  const renderBottomSheetContent = (status: string) => {
    const components: Record<string, React.ReactElement | null> = {
      pending: null,
      preparing: <RestaurantPreparing data={orderQuery.data} />,
      ready_for_pickup: <ReadyForPickup data={orderQuery.data} />,
    };
    return (
      components[status] || (
        <Text className="text-center text-gray-600">
          Estado desconocido: {status}
        </Text>
      )
    );
  };

  return (
    <GestureHandlerRootView>
      <View className="flex-1 relative">
        <View className="absolute top-20 w-full px-10 flex justify-between flex-row items-center">
          <TouchableOpacity
            className="bg-white p-2 rounded-full w-10 h-10 flex items-center justify-center z-10"
            onPress={() => router.push("/(root)/(tabs)/orders")}
          >
            <Image source={icons.close} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity className="z-10 px-3 py-1 bg-white rounded-2xl items-center">
            <Text className="text-base font-JakartaLight">Ayuda</Text>
          </TouchableOpacity>
        </View>
        {renderBackgroundContent(orderQuery.data.status)}
        {renderBottomSheetContent(orderQuery.data.status)}
      </View>
    </GestureHandlerRootView>
  );
};

export default MapFollowUp;
