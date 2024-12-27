import { icons } from "@/constants";
import { useLocationStore } from "@/store/locationStore";
import { ActivityIndicator, View } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
// import MapViewDirections from "react-native-maps-directions";

const Map = ({
  longitude,
  latitude,
  markers,
}: {
  longitude: number;
  latitude: number;
  markers: any[];
}) => {
  const region = {
    latitude: latitude,
    longitude: longitude,
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
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={icons.marker}
        />
      ))}
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        title="Tu ubicación"
        image={icons.pin}
      />
    </MapView>
  );
};

export default Map;
