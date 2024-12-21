import { useLocationStore } from "@/store/locationStore";
import { ActivityIndicator, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";

const Map = () => {
  const { userLongitude, userLatitude } = useLocationStore();

  if (!userLatitude || !userLongitude) {
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ flex: 1, height: "100%", borderRadius: 15 }}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      // initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    />
  );
};

export default Map;
