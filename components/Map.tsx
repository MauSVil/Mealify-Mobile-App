import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

interface MapProps {
  origin?: {
    latitude: number;
    longitude: number;
  };
  destination?: {
    latitude: number;
    longitude: number;
  };
  markers?: {
    id: string;
    latitude: number;
    longitude: number;
    title?: string;
    image?: any;
    icon?: keyof typeof Ionicons.glyphMap;
  }[];
  mapRef?: React.RefObject<MapView>;
  showsUserLocation?: boolean;
  onRegionChange?: (region: any) => void;
  mapStyle?: object;
  onMapReady?: () => void;
}

const Map: React.FC<MapProps> = ({
  markers = [],
  mapRef,
  showsUserLocation = false,
  onRegionChange,
  mapStyle,
  onMapReady,
  origin,
  destination,
}) => {
  const defaultRegion = {
    latitude: origin?.latitude || 0,
    longitude: origin?.longitude || 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_DEFAULT}
      style={[{ flex: 1, height: "100%", borderRadius: 15 }, mapStyle]}
      initialRegion={defaultRegion}
      showsUserLocation={showsUserLocation}
      showsMyLocationButton={showsUserLocation}
      userInterfaceStyle="light"
      onRegionChangeComplete={onRegionChange}
      showsPointsOfInterest={false}
      onMapReady={() => {
        if (onMapReady) onMapReady();
      }}
    >
      {Array.isArray(markers) &&
        markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title || ""}
            image={marker.image}
          >
            {marker?.icon && <Ionicons name={marker.icon} size={24} />}
          </Marker>
        ))}
      {origin && destination && (
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
          strokeColor="#0286FF"
          strokeWidth={4}
          onError={(errorMessage) => {
            console.error("Error calculating directions:", errorMessage);
          }}
        />
      )}
    </MapView>
  );
};

export default Map;
