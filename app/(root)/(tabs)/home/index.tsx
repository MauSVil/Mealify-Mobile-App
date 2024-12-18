import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRestaurants } from "./_hooks/useRestaurants";
import { icons } from "@/constants";
import { useUser } from "@clerk/clerk-expo";
import RestaurantsFlatList from "@/components/RestaurantsFlatList";
import InputField from "@/components/InputField";
import { cartStore } from "@/store/cartStore";
import { router } from "expo-router";

const Home = () => {
  const { user } = useUser();
  const { restaurantsQuery } = useRestaurants();
  const [isTextHidden, setIsTextHidden] = useState(false);

  const { cart } = cartStore();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    const isScrolling = currentOffset > 0;
    setIsTextHidden(isScrolling);
  };

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <View
        className={`flex flex-col items-start justify-between my-3 px-5 gap-1`}
      >
        <View
          className={`flex flex-row justify-between w-full ${isTextHidden && "hidden"}`}
        >
          <Text className={`text-2xl capitalize font-JakartaExtraBold`}>
            Bienvenido{", "}
            {user?.firstName ||
              user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
            👋
          </Text>
          <TouchableOpacity
            className="justify-center items-center w-10 h-10 rounded-full bg-white relative"
            onPress={() => router.push("/cart")}
          >
            <Image source={icons.star} className="w-4 h-4" tintColor="000" />
            <View className="w-5 h-5 rounded-full flex items-center justify-center bg-orange-600 absolute bottom-0 -right-2">
              <Text className="text-sm text-white">
                {Object.keys(cart).length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-full flex-row gap-4 items-center justify-between">
          <InputField
            icon={icons.search}
            placeholder="Buscar restaurantes"
            containerStyle="border-general-100 w-full"
            onFocus={() => setIsTextHidden(true)}
            onBlur={() => setIsTextHidden(false)}
          />
          {isTextHidden && (
            <TouchableOpacity
              className="justify-center items-center w-10 h-10 rounded-full bg-white relative"
              onPress={() => router.push("/cart")}
            >
              <Image source={icons.star} className="w-4 h-4" tintColor="000" />
              <View className="w-5 h-5 rounded-full flex items-center justify-center bg-orange-600 absolute bottom-0 -right-2">
                <Text className="text-sm text-white">
                  {Object.keys(cart).length}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView
        onScroll={handleScroll}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <RestaurantsFlatList
          title="Para ti"
          restaurants={restaurantsQuery.data!}
          loading={restaurantsQuery.isLoading}
        />
        <RestaurantsFlatList
          title="Favoritos"
          restaurants={restaurantsQuery.data!}
          loading={restaurantsQuery.isLoading}
        />
        <RestaurantsFlatList
          title="No te lo puedes perder"
          restaurants={restaurantsQuery.data!}
          loading={restaurantsQuery.isLoading}
        />
        <RestaurantsFlatList
          title="No te lo puedes perder"
          restaurants={restaurantsQuery.data!}
          loading={restaurantsQuery.isLoading}
        />
        <RestaurantsFlatList
          title="No te lo puedes perder"
          restaurants={restaurantsQuery.data!}
          loading={restaurantsQuery.isLoading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
