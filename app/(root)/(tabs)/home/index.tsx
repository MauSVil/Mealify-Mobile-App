import {
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRestaurants } from "./_hooks/useRestaurants";
import { icons } from "@/constants";
import RestaurantsFlatList from "@/components/RestaurantsFlatList";
import InputField from "@/components/InputField";
import { cartStore } from "@/store/cartStore";
import { router } from "expo-router";
import * as Location from "expo-location";
import { useLocationStore } from "@/store/locationStore";

const Home = () => {
  const { setUserLocation, userAddress } = useLocationStore();
  const { restaurantsQuery } = useRestaurants();
  const [isTextHidden, setIsTextHidden] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(true);

  const { cart } = cartStore();

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    const isScrolling = currentOffset > 0;
    setIsTextHidden(isScrolling);
  };

  useEffect(() => {
    const requestLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermissions(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    };

    requestLocation();
  }, []);

  // if (!hasPermissions) router.push('/(root)/no-permissions');

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <View
        className={`flex flex-col items-start justify-between my-1 px-5 gap-1`}
      >
        <View
          className={`flex flex-row justify-between w-full ${isTextHidden && "hidden"}`}
        >
          <Pressable
            onPress={() => router.push("/(root)/(address)")}
            className="max-w-[70%] flex-1 flex flex-row gap-2 items-center"
          >
            <Text
              className={`text-xl capitalize font-JakartaExtraBold`}
              numberOfLines={1}
            >
              {userAddress}
            </Text>
            <Image source={icons.map} className="w-6 h-6" />
          </Pressable>
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
