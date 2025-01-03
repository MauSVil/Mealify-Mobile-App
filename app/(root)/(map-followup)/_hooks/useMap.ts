import { icons } from "@/constants";
import { useEffect, useState } from "react";
import MapView from "react-native-maps";

const offsetLat = 0.002;

export const useMap = ({
  data,
  mapRef,
  candidatesData,
  isMapReady,
}: {
  data: any;
  mapRef: React.RefObject<MapView>;
  candidatesData: any;
  isMapReady: boolean;
}) => {
  const [markers, setMarkers] = useState<any[]>([]);
  const [origin, setOrigin] = useState({ latitude: 0, longitude: 0 });
  const [destination, setDestination] = useState({ latitude: 0, longitude: 0 });

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
      setOrigin({
        latitude: Number(data.restaurants.latitude),
        longitude: Number(data.restaurants.longitude),
      });
      setMarkers(dynamicMarkers);
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: data.restaurants.latitude - offsetLat,
            longitude: data.restaurants.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          500,
        );
      }
    }
    if (data?.status === "ready_for_pickup") {
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
        setOrigin({
          latitude: Number(data.restaurants.latitude),
          longitude: Number(data.restaurants.longitude),
        });
      }
      if (data?.latitude && data?.longitude) {
        dynamicMarkers.push({
          id: "my-location",
          title: "Tu ubicacion",
          latitude: data.latitude,
          longitude: data.longitude,
          icon: "pin",
        });
      }
      setMarkers(dynamicMarkers);
      fitToCoordinates(dynamicMarkers);
    }
    if (data?.status === "in_progress") {
      const markers: any[] = [
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
        markers.push({
          id: "Driver",
          latitude: data.delivery_drivers?.latitude,
          longitude: data.delivery_drivers?.longitude,
          title: data.delivery_drivers?.name,
          image: icons.marker,
        });
      }
      setDestination({
        latitude: Number(data.restaurants.latitude),
        longitude: Number(data.restaurants.longitude),
      });
      setOrigin({
        latitude: Number(data.delivery_drivers?.latitude),
        longitude: Number(data.delivery_drivers?.longitude),
      });
      setMarkers(markers);
      fitToCoordinates(markers);
    }
  }, [
    data?.status,
    candidatesData,
    isMapReady,
    data?.latitude,
    data?.longitude,
    data?.restaurants?.latitude,
    data?.restaurants?.longitude,
    data?.restaurants?.name,
    mapRef,
    data?.delivery_drivers?.latitude,
    data?.delivery_drivers?.longitude,
    data?.delivery_drivers?.name,
  ]);

  return {
    markers,
    origin,
    destination,
  };
};
