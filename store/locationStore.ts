import { LocationStore } from "@/types/type";
import { create } from "zustand";

export const useLocationStore = create<LocationStore>((set) => ({
  userAddress: null,
  userLongitude: null,
  userLatitude: null,
  selected: null,
  geoLatitude: null,
  geoLongitude: null,
  geoAddress: null,
  setSelected: (selected) => set({ selected }),
  setUserLocation: ({ latitude, longitude, address }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },
  setGeoLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      geoLatitude: latitude,
      geoLongitude: longitude,
      geoAddress: address,
    }));
  },
}));
