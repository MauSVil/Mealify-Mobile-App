import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleTextInput from "@/components/GoogleInputAutoComplete";
import { icons } from "@/constants";
import { Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const Address = () => {
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
        // initialLocation={userAddress}
        containerStyle="bg-neutral-100"
        textInputBackgroundColor="#F5F5F5"
        // handlePress={(location) => setUserLocation(location)}
        handlePress={() => {}}
      />
    </SafeAreaView>
  );
};

export default Address;
