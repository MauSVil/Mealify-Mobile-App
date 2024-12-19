import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleTextInput from "@/components/GoogleInputAutoComplete";
import { icons } from "@/constants";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { useLocationStore } from "@/store/locationStore";

const Address = () => {
  const { userAddress, setUserLocation } = useLocationStore();

  return (
    <SafeAreaView className="p-8 bg-general-500 flex-1">
      <TouchableOpacity
        className="bg-white flex items-center justify-center rounded-full w-10 h-10 mb-4"
        onPress={() => router.dismiss()}
      >
        <Image source={icons.close} className="w-6 h-6" />
      </TouchableOpacity>
      <GoogleTextInput
        placeholder="Donde te encuentras?"
        icon={icons.target}
        initialLocation={userAddress}
        containerStyle="bg-neutral-100"
        textInputBackgroundColor="#F5F5F5"
        handlePress={(location) => {
          setUserLocation(location);
          router.dismiss();
        }}
      />
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className="flex-row items-center p-4 bg-white rounded-lg mb-4 gap-2 shadow-sm shadow-neutral-400/70"
              onPress={() => router.dismiss()}
            >
              <Image source={icons.target} className="w-6 h-6" />
              <View className="flex-1">
                <Text className="text-neutral-900">Calle 1 # 123</Text>
                <Text className="text-neutral-500">Bogotá, Colombia</Text>
              </View>
              <TouchableOpacity className="rounded-full flex items-center justify-center w-10 h-10">
                <Image source={icons.close} className="w-6 h-6" />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Address;
