import { icons } from "@/constants";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";

export const useMap = ({
  data,
  mapRef,
  bottomSheetRef,
  candidatesData,
  isMapReady,
}: {
  data: any;
  mapRef: React.RefObject<MapView>;
  bottomSheetRef: React.RefObject<BottomSheet>;
  candidatesData: any;
  isMapReady: boolean;
}) => {
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<any[]>([]);
  const [origin, setOrigin] = useState<
    { latitude: number; longitude: number } | undefined
  >();
  const [destination, setDestination] = useState<
    { latitude: number; longitude: number } | undefined
  >();
  const [initialRegion, setInitialRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });

  useEffect(() => {
    const fitToCoordinates = (markers: any[]) => {
      if (mapRef.current && markers.length > 0) {
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

    const handleStatusChange = async () => {
      try {
        setLoading(true);

        let dynamicMarkers: any[] = [];
        if (data?.status === "preparing") {
          dynamicMarkers = [
            {
              id: "restaurant",
              latitude: data.restaurants.latitude,
              longitude: data.restaurants.longitude,
              title: data.restaurants.name,
              icon: "restaurant",
            },
          ];
          setDestination(undefined);
          setOrigin({
            latitude: Number(data.restaurants.latitude),
            longitude: Number(data.restaurants.longitude),
          });
          setMarkers(dynamicMarkers);
          setInitialRegion({
            latitude: Number(data.restaurants.latitude),
            longitude: Number(data.restaurants.longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        } else if (data?.status === "ready_for_pickup") {
          dynamicMarkers = [
            ...(candidatesData?.map((candidate: any) => ({
              id: candidate.id,
              latitude: candidate.latitude,
              longitude: candidate.longitude,
              title: candidate.name,
              image: icons.marker,
            })) || []),
          ];

          if (data?.restaurants?.latitude && data?.restaurants?.longitude) {
            dynamicMarkers.push({
              id: "restaurant",
              latitude: data.restaurants.latitude,
              longitude: data.restaurants.longitude,
              title: data.restaurants.name,
              icon: "restaurant",
            });
          }
          setMarkers(dynamicMarkers);
          setInitialRegion({
            latitude: Number(data.restaurants.latitude),
            longitude: Number(data.restaurants.longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        } else if (data?.status === "in_progress") {
          dynamicMarkers = [
            {
              id: "restaurant",
              latitude: data.restaurants.latitude,
              longitude: data.restaurants.longitude,
              title: data.restaurants.name,
              icon: "restaurant",
            },
          ];

          if (
            data?.delivery_drivers?.latitude &&
            data?.delivery_drivers?.longitude
          ) {
            dynamicMarkers.push({
              id: "driver",
              latitude: data.delivery_drivers.latitude,
              longitude: data.delivery_drivers.longitude,
              title: data.delivery_drivers.name,
              image: icons.marker,
            });
          }
          setMarkers(dynamicMarkers);
          setInitialRegion({
            latitude: Number(data.restaurants.latitude),
            longitude: Number(data.restaurants.longitude),
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
        }

        fitToCoordinates(dynamicMarkers);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    handleStatusChange();
  }, [data, candidatesData, isMapReady, mapRef]);

  return {
    markers,
    origin,
    destination,
    loading,
    initialRegion,
  };
};
