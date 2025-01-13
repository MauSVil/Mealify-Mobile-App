import { icons } from "@/constants";
import { useEffect, useState } from "react";

export const useMap = ({
  data,
  candidatesData,
}: {
  data: any;
  candidatesData: any;
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

  const handlePreparingStatus = async () => {
    const dynamicMarkers = [
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
  };

  const handleReadyForPickupStatus = async () => {
    const dynamicMarkers = [
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
  };

  const handleInProgressStatus = async () => {
    const dynamicMarkers = [
      {
        id: "restaurant",
        latitude: data.restaurants.latitude,
        longitude: data.restaurants.longitude,
        title: data.restaurants.name,
        icon: "restaurant",
      },
    ];

    if (data?.delivery_drivers?.latitude && data?.delivery_drivers?.longitude) {
      dynamicMarkers.push({
        id: "driver",
        latitude: data.delivery_drivers.latitude,
        longitude: data.delivery_drivers.longitude,
        title: data.delivery_drivers.name,
        icon: "car",
      });
    }
    setMarkers(dynamicMarkers);
    setInitialRegion({
      latitude: Number(data.restaurants.latitude),
      longitude: Number(data.restaurants.longitude),
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
    setOrigin({
      latitude: Number(data.delivery_drivers.latitude),
      longitude: Number(data.delivery_drivers.longitude),
    });
    setDestination({
      latitude: Number(data.restaurants.latitude),
      longitude: Number(data.restaurants.longitude),
    });
  };

  useEffect(() => {
    if (
      data?.status !== "preparing" &&
      data?.status !== "ready_for_pickup" &&
      data?.status !== "in_progress"
    )
      return;
    const handleStatusChange = async () => {
      try {
        setLoading(true);
        switch (data?.status) {
          case "preparing":
            await handlePreparingStatus();
            break;
          case "ready_for_pickup":
            await handleReadyForPickupStatus();
            break;
          case "in_progress":
            await handleInProgressStatus();
            break;
          default:
            break;
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    handleStatusChange();
  }, [data?.status]);

  return {
    markers,
    origin,
    destination,
    loading,
    initialRegion,
  };
};
