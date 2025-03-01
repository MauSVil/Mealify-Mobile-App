import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ProductCard from "@/components/ProductCard";
import { useRestaurant } from "./_hooks/useRestaurant";
import { Ionicons } from "@expo/vector-icons";
import { TabView, SceneMap } from "react-native-tab-view";
import Animated from "react-native-reanimated";
import CartToast from "@/components/CartToast";
import { cartStore } from "@/store/cartStore";

const translations: { [key: string]: string } = {
  meals: "Comidas",
  breakfasts: "Desayunos",
  dinners: "Cenas",
  desserts: "Postres",
  drinks: "Bebidas",
  others: "Otros",
};

const routes = [
  "meals",
  "breakfasts",
  "dinners",
  "desserts",
  "drinks",
  "others",
].map((title) => ({
  key: title,
  title: translations[title],
}));

const CustomTabBar = (props: any) => {
  const { navigationState, jumpTo } = props;
  const scrollViewRef = useRef<ScrollView>(null);
  const tabPositions = useRef<{ [key: string]: number }>({});

  const handleTabPress = (routeKey: string, index: number) => {
    jumpTo(routeKey);

    if (scrollViewRef.current) {
      const position = tabPositions.current[routeKey] || 0;
      scrollViewRef.current.scrollTo({
        x: position - 100,
        animated: true,
      });
    }
  };

  return (
    <View style={{ height: 40 }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {navigationState.routes.map((route: any, index: number) => {
          const isActive = navigationState.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              className="mr-6"
              onPress={() => handleTabPress(route.key, index)}
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                tabPositions.current[route.key] = layout.x;
              }}
            >
              <Text
                style={{
                  fontFamily: "Jakarta",
                  fontSize: 16,
                  fontWeight: isActive ? "bold" : "normal",
                  color: isActive ? "black" : "gray",
                }}
              >
                {route.title}
              </Text>
              <Animated.View
                style={{
                  height: 2,
                  backgroundColor: isActive ? "black" : "transparent",
                  width: "100%",
                  marginTop: 4,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const RestaurantScreen = () => {
  const { restaurantId } = useLocalSearchParams();
  const { singleRestaurantQuery, productsQuery } = useRestaurant(
    Number(restaurantId),
  );

  const [index, setIndex] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const { cart } = cartStore();
  const total = Object.keys(cart).reduce((acc, key) => {
    return acc + cart[key].quantity;
  }, 0);

  useEffect(() => {
    setShowToast(total > 0);
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [total]);

  const restaurantInfo = singleRestaurantQuery.data;

  const renderScene = useMemo(() => {
    return SceneMap({
      meals: () => (
        <View className="mt-6">
          <FlatList
            data={(productsQuery.data || []).filter(
              (product: any) => product.group === "meals",
            )}
            renderItem={({ item }) => <ProductCard item={item} />}
            ListFooterComponent={<View className="h-20" />}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="font-Jakarta text-xl text-general-200">
                  No hay productos disponibles
                </Text>
              </View>
            }
          />
        </View>
      ),
      breakfasts: () => (
        <View className="mt-6">
          <FlatList
            data={(productsQuery.data || []).filter(
              (product: any) => product.group === "breakfasts",
            )}
            renderItem={({ item }) => <ProductCard item={item} />}
            ListFooterComponent={<View className="h-20" />}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="font-Jakarta text-xl text-general-200">
                  No hay productos disponibles
                </Text>
              </View>
            }
          />
        </View>
      ),
      dinners: () => (
        <View className="mt-6">
          <FlatList
            data={(productsQuery.data || []).filter(
              (product: any) => product.group === "dinners",
            )}
            renderItem={({ item }) => <ProductCard item={item} />}
            ListFooterComponent={<View className="h-20" />}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="font-Jakarta text-xl text-general-200">
                  No hay productos disponibles
                </Text>
              </View>
            }
          />
        </View>
      ),
      desserts: () => (
        <View className="mt-6">
          <FlatList
            data={(productsQuery.data || []).filter(
              (product: any) => product.group === "desserts",
            )}
            renderItem={({ item }) => <ProductCard item={item} />}
            ListFooterComponent={<View className="h-20" />}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="font-Jakarta text-xl text-general-200">
                  No hay productos disponibles
                </Text>
              </View>
            }
          />
        </View>
      ),
      drinks: () => (
        <View className="mt-6">
          <FlatList
            data={(productsQuery.data || []).filter(
              (product: any) => product.group === "drinks",
            )}
            renderItem={({ item }) => <ProductCard item={item} />}
            ListFooterComponent={<View className="h-20" />}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="font-Jakarta text-xl text-general-200">
                  No hay productos disponibles
                </Text>
              </View>
            }
          />
        </View>
      ),
      others: () => (
        <View className="mt-6">
          <FlatList
            data={(productsQuery.data || []).filter(
              (product: any) => product.group === "others",
            )}
            renderItem={({ item }) => <ProductCard item={item} />}
            ListFooterComponent={<View className="h-20" />}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center">
                <Text className="font-Jakarta text-xl text-general-200">
                  No hay productos disponibles
                </Text>
              </View>
            }
          />
        </View>
      ),
    });
  }, [productsQuery.data]);

  return (
    <View className="flex-1 items-center bg-general-500 relative">
      <Image
        source={{
          uri: restaurantInfo?.hero_image_min,
        }}
        className="w-full h-48 bg-general-100"
      />
      <View className="flex flex-row absolute top-16 left-10 items-center">
        <TouchableOpacity
          className="bg-white items-center justify-center rounded-full w-10 h-10"
          onPress={() => router.dismiss()}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image
        className="rounded-full bg-general-100 w-20 h-20 top-36 absolute border-white border-2 shadow-md shadow-neutral-400/70 z-10"
        source={{
          uri: restaurantInfo?.hero_image_min,
        }}
      />
      <View className="h-14 w-full" />

      <View className="mb-7">
        <Text
          className="font-JakartaExtraBold text-2xl text-center"
          numberOfLines={1}
        >
          {restaurantInfo?.name}
        </Text>
        <Text
          className="font-Jakarta text-xl text-general-200 text-center"
          numberOfLines={2}
        >
          {restaurantInfo?.phone}
        </Text>
      </View>

      <View className="flex-1 w-full px-7 mb-7">
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={(props) => <CustomTabBar {...props} />}
        />
      </View>

      {showToast && (
        <CartToast
          count={total}
          onPress={() => router.push("/cart")}
          onClose={() => {}}
        />
      )}
    </View>
  );
};

export default RestaurantScreen;
