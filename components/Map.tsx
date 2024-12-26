import { icons } from "@/constants";
import { useLocationStore } from "@/store/locationStore";
import { ActivityIndicator, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";

const markers = [
  { id: 1, lat: 19.5105, lng: -99.2342 },
  { id: 2, lat: 19.511, lng: -99.2347 },
  { id: 3, lat: 19.5098, lng: -99.2335 },
  { id: 4, lat: 19.5102, lng: -99.235 },
  { id: 5, lat: 19.5115, lng: -99.2338 },
  { id: 6, lat: 19.5095, lng: -99.234 },
];

const Map = ({
  longitude,
  latitude,
}: {
  longitude: number;
  latitude: number;
}) => {
  const { userLongitude, userLatitude } = useLocationStore();

  if (!userLatitude || !userLongitude) {
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  const region = {
    latitude: latitude || userLatitude,
    longitude: longitude || userLongitude,
    latitudeDelta: 0.0922 / 10,
    longitudeDelta: 0.0421 / 10,
  };

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      style={{ flex: 1, height: "100%", borderRadius: 15 }}
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      // showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.lat,
            longitude: marker.lng,
          }}
          title="Driver"
          image={icons.marker}
        />
      ))}
      <Marker
        coordinate={{
          latitude: latitude || userLatitude,
          longitude: longitude || userLongitude,
        }}
        title="Tu ubicación"
        description="Estamos buscando un repartidor para ti..."
        image={icons.pin}
      />
    </MapView>
  );
};

export default Map;
