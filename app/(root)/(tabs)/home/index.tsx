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

const Home = () => {
  const { user } = useUser();
  const { restaurantsQuery } = useRestaurants();
  const [isTextHidden, setIsTextHidden] = useState(false);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentOffset = e.nativeEvent.contentOffset.y;
    const isScrolling = currentOffset > 0;
    setIsTextHidden(isScrolling);
  };

  return (
    <SafeAreaView className="bg-general-500 flex-1">
      <View
        className={`flex flex-row items-start justify-between my-5 px-5 gap-4 ${isTextHidden && "items-center"}`}
      >
        <View className="flex flex-col flex-1">
          <Text
            className={`text-2xl capitalize font-JakartaExtraBold ${isTextHidden && "hidden"}`}
          >
            Bienvenido{", "}
            {user?.firstName ||
              user?.emailAddresses[0].emailAddress.split("@")[0]}{" "}
            👋
          </Text>
          <InputField
            icon={icons.search}
            placeholder="Buscar restaurantes"
            containerStyle="border-general-100"
            onFocus={() => setIsTextHidden(true)}
            onBlur={() => setIsTextHidden(false)}
          />
        </View>
        <TouchableOpacity className="justify-center items-center w-10 h-10 rounded-full bg-white">
          <Image source={icons.out} className="w-4 h-4" />
        </TouchableOpacity>
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
