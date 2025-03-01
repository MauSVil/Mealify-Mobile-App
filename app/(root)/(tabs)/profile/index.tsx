import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";
import { useProfile } from "@/hooks/useProfile";
import { router } from "expo-router";

const Profile = () => {
  const { userId, signOut } = useAuth();
  const { localStore } = useProfile({ id: userId as string });

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  return (
    <SafeAreaView className="bg-general-500 flex-1 px-4 items-center mt-16">
      <View className="items-center p-8 bg-white rounded-2xl w-full">
        <View className="h-32 w-32 rounded-full bg-gray-300" />
        <Text className="text-3xl font-bold mt-4">
          {localStore?.profile?.name || "Profile"}
        </Text>
        <Text className="text-lg text-gray-500">
          {localStore?.profile?.email || ""}
        </Text>
        <Text className="text-lg text-gray-500">
          {localStore?.profile?.phone || ""}
        </Text>

        <View className="h-10" />

        <View className="w-full items-center justify-center">
          <Text className="text-2xl font-bold">Settings</Text>
          <View className="h-8" />
          <TouchableOpacity className="w-full bg-gray-100 p-4 items-center justify-center rounded-md">
            <Text className="text-lg text-black">Edit Profile</Text>
          </TouchableOpacity>
          <View className="h-2" />
          <TouchableOpacity className="w-full bg-gray-100 p-4 items-center justify-center rounded-md">
            <Text className="text-lg text-black">Change Password</Text>
          </TouchableOpacity>
          <View className="h-2" />
          <TouchableOpacity
            className="w-full bg-red-500 p-4 items-center justify-center rounded-md"
            onPress={handleSignOut}
          >
            <Text className="text-lg text-white">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
