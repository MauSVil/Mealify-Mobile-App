import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleTextInput from "@/components/GoogleInputAutoComplete";
import { icons } from "@/constants";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useLocationStore } from "@/store/locationStore";
import { useAddresses } from "./_hooks/useAddresses";

const Address = () => {
  const {
    userLatitude,
    userLongitude,
    userAddress,
    setUserLocation,
    setSelected,
    selected,
    geoLatitude,
    geoLongitude,
    geoAddress,
  } = useLocationStore();

  const { getAddressesQuery, addAddressMutation, deleteAddressMutation } =
    useAddresses();

  if (getAddressesQuery.isLoading || getAddressesQuery.isRefetching) {
    return (
      <SafeAreaView className="p-8 bg-general-500 flex-1">
        <TouchableOpacity
          className="bg-white flex items-center justify-center rounded-full w-10 h-10 mb-4"
          onPress={() => router.dismiss()}
        >
          <Ionicons name="close" size={20} />
        </TouchableOpacity>
        <View className="w-full h-16 bg-general-100 animate-pulse rounded-lg mb-4" />
        <View className="w-full h-24 bg-general-100 animate-pulse rounded-lg mb-4" />
        <View className="w-full h-24 bg-general-100 animate-pulse rounded-lg mb-4" />
        <View className="w-full h-24 bg-general-100 animate-pulse rounded-lg mb-4" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="p-8 bg-general-500 flex-1">
      <TouchableOpacity
        className="bg-white flex items-center justify-center rounded-full w-10 h-10 mb-4"
        onPress={() => router.dismiss()}
      >
        <Ionicons name="close" size={20} />
      </TouchableOpacity>
      <GoogleTextInput
        placeholder="Donde te encuentras?"
        icon={icons.target}
        initialLocation={userAddress}
        containerStyle="bg-neutral-200"
        textInputBackgroundColor="transparent"
        handlePress={async (location) => {
          const addressAdded = await addAddressMutation.mutateAsync({
            address_line: location.address,
            latitude: location.latitude,
            longitude: location.longitude,
          });

          setSelected(addressAdded.id);

          setUserLocation(location);
          router.dismiss();
        }}
      />
      <Text className="text-xl font-JakartaBold mt-8 mb-2">
        Tu ubicación actual
      </Text>
      <TouchableOpacity
        className={`flex-row items-center p-4 bg-white rounded-lg mb-4 gap-2 shadow-sm shadow-neutral-400/70 ${userLatitude === geoLatitude && userLongitude === geoLongitude && "border-primary-500 border-[1px]"}`}
        onPress={() => {
          setUserLocation({
            latitude: geoLatitude!,
            longitude: geoLongitude!,
            address: geoAddress!,
          });
          setSelected(null);
          router.dismiss();
        }}
      >
        <Image source={icons.target} className="w-6 h-6" />
        <View className="flex-1">
          <Text className="text-neutral-900" numberOfLines={2}>
            {geoAddress}
          </Text>
          <Text className="text-neutral-500">
            {geoLatitude}, {geoLongitude}
          </Text>
        </View>
      </TouchableOpacity>

      <Text className="text-xl font-JakartaBold mb-2">
        Ubicaciones guardadas
      </Text>
      <FlatList
        data={getAddressesQuery.data || []}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className={`flex-row items-center p-4 bg-white rounded-lg mb-4 gap-2 shadow-sm shadow-neutral-400/70 ${selected === item.id && "border-primary-500 border-[1px]"}`}
              onPress={() => {
                setSelected(item.id);
                setUserLocation({
                  latitude: item.latitude,
                  longitude: item.longitude,
                  address: item.address_line,
                });
                router.dismiss();
              }}
            >
              <Image source={icons.target} className="w-6 h-6" />
              <View className="flex-1">
                <Text className="text-neutral-900" numberOfLines={2}>
                  {item.address_line}
                </Text>
                <Text className="text-neutral-500">
                  {item.latitude}, {item.longitude}
                </Text>
              </View>
              <TouchableOpacity
                className="rounded-full flex items-center justify-center w-10 h-10 bg-red-400"
                onPress={() => deleteAddressMutation.mutateAsync(item.id)}
                disabled={getAddressesQuery.data?.length <= 1}
              >
                <Ionicons
                  name="trash"
                  className="text-white"
                  color="white"
                  size={15}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Address;
