import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
}

const Map: React.FC<MapProps> = ({
  markers = [],
  mapRef,
  showsUserLocation = false,
  mapStyle,
  onMapReady,
  origin,
  destination,
  initialRegion,
}) => {
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1);
  }, [markers]);

  const fitToCoordinates = (markers: any[]) => {
    if (mapRef?.current && markers.length > 0) {
      const coordinates = markers.map((marker) => ({
        latitude: marker.latitude,
        longitude: marker.longitude,
      }));
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: {
          top: 150,
          right: 150,
          bottom: 350,
          left: 150,
        },
        animated: true,
      });
    }
  };

  return (
    <MapView
      key={mapKey}
      ref={mapRef}
      provider={PROVIDER_DEFAULT}
      initialRegion={initialRegion}
      style={[{ flex: 1, height: "100%", borderRadius: 15 }, mapStyle]}
      showsUserLocation={showsUserLocation}
      showsMyLocationButton={showsUserLocation}
      userInterfaceStyle="light"
      onMapReady={() => {
        onMapReady?.();
        fitToCoordinates(markers);
      }}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title || ""}
          image={marker.image}
        >
          {marker.icon && (
            <Ionicons
              name={marker.icon}
              size={24}
              color="#000"
              style={{ marginBottom: 20 }}
            />
          )}
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
