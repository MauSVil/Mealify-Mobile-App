import React, { useEffect, useRef, useState } from "react";
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
import { useOrder } from "./_hooks/useOrder";
import socketService from "@/socketService";
import RestaurantPreparing from "./_components/RestaurantPreparing";
import ReadyForPickup from "./_components/ReadyForPickup";
import MapView, { Marker } from "react-native-maps";
import { useMap } from "./_hooks/useMap";
import { Ionicons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import InProgress from "./_components/InProgress";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import PendingOrder from "./_components/PendingOrder";
import RestaurantDelayed from "./_components/RestaurantDelayed";

const MapFollowUp = () => {
  const mapRef = useRef<MapView>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
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
    socketService.joinRoom(`order_${orderId}`);

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

  useEffect(() => {
    switch (orderQuery.data?.status) {
      case "pending":
        bottomSheetRef.current?.snapToIndex(2);
        break;
      case "preparing":
        bottomSheetRef.current?.snapToIndex(2);
        break;
      case "ready_for_pickup":
        bottomSheetRef.current?.snapToIndex(1);
        break;
      case "in_progress":
        bottomSheetRef.current?.snapToIndex(1);
        break;
      default:
        bottomSheetRef.current?.close();
        break;
    }
  }, [orderQuery.data?.status]);

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

  if (orderQuery.data?.status === "cancelled_by_user") {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center text-gray-600">
          El pedido fue cancelado por el usuario
        </Text>
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("/orders")}
        >
          <Text className="text-blue-500">Volver a la lista de pedidos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderBottomSheetContent = (status: string) => {
    const components: Record<string, React.ReactElement | null> = {
      pending: <PendingOrder data={orderQuery.data} />,
      restaurant_delayed: <RestaurantDelayed />,
      preparing: <RestaurantPreparing data={orderQuery.data} />,
      ready_for_pickup: <ReadyForPickup data={orderQuery.data} />,
      in_progress: <InProgress data={orderQuery.data} />,
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
      <BottomSheet snapPoints={["35%", "65%"]} index={1}>
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          {renderBottomSheetContent(orderQuery.data?.status || "pending")}
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default MapFollowUp;
