import React, { useEffect, useRef, useState } from "react";
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
    if (socket) socketService.joinRoom(orderId as string);

    return () => {
      socketService.disconnect();
    };
  }, [orderId]);

  const { orderQuery, candidatesQuery } = useOrder(orderId as string);

  const { markers, origin, destination } = useMap({
    data: orderQuery.data,
    isMapReady,
    candidatesData: candidatesQuery.data,
    mapRef,
  });

  if (!orderId || orderQuery.isLoading || candidatesQuery.isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size={24} color="#000" />
      </View>
    );
  }

  const renderBottomSheetContent = (status: string) => {
    const components: Record<string, React.ReactElement> = {
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
            onPress={() => router.dismiss()}
          >
            <Image source={icons.close} className="w-6 h-6" />
          </TouchableOpacity>
          <TouchableOpacity className="z-10 px-3 py-1 bg-white rounded-2xl items-center">
            <Text className="text-base font-JakartaLight">Ayuda</Text>
          </TouchableOpacity>
        </View>
        <Map
          mapRef={mapRef}
          markers={markers}
          onMapReady={() => setIsMapReady(true)}
          origin={origin}
          destination={destination}
        />
        <BottomSheet ref={bottomSheetRef} snapPoints={["30%", "85%"]} index={1}>
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {renderBottomSheetContent(orderQuery.data.status)}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default MapFollowUp;
