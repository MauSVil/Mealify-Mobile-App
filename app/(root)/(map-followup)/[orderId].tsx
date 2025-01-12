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
import MapView, { Marker } from "react-native-maps";
import { useMap } from "./_hooks/useMap";
import { Ionicons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";

const MapFollowUp = () => {
  const mapRef = useRef<MapView>(null);
  const [_, setShouldRender] = useState(false);
  const { orderId } = useLocalSearchParams();
  const { orderQuery, candidatesQuery } = useOrder(orderId as string);

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

  const fitToCoordinates = (markers: any[]) => {
    if (mapRef?.current && markers.length > 0) {
      const coordinates = markers.map((marker) => ({
        latitude: marker.latitude,
        longitude: marker.longitude,
      }));
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 150,
          right: 150,
          bottom: 350,
          left: 150,
        },
        animated: true,
      });
    }
  };

  const { markers, origin, destination, loading, initialRegion } = useMap({
    data: orderQuery.data,
    candidatesData: candidatesQuery.data,
  });

  useEffect(() => {
    setShouldRender((prevState) => !prevState);
    fitToCoordinates(markers);
  }, [markers]);

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
        <MapView
          initialRegion={initialRegion}
          style={[{ flex: 1, height: "100%", borderRadius: 15 }]}
          userInterfaceStyle="light"
          onMapReady={() => {
            fitToCoordinates(markers);
          }}
          ref={mapRef}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title || ""}
              image={marker.image}
            >
              {marker.icon && (
                <Ionicons
                  name={marker.icon}
                  size={24}
                  color="#000"
                  style={{ marginBottom: 20 }}
                />
              )}
            </Marker>
          ))}
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
            strokeColor="#0286FF"
            strokeWidth={4}
            resetOnChange
            onReady={() => {
              setTimeout(() => {
                setShouldRender((prevState) => !prevState);
              }, 100);
            }}
          />
        </MapView>
      </View>
      {renderBottomSheetContent(orderQuery.data?.status || "pending")}
    </GestureHandlerRootView>
  );
};

export default MapFollowUp;
