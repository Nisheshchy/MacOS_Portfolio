/** @format */
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSystemStore = create(
    persist(
        (set) => ({
            brightness: 100,
            volume: 50,
            isDarkMode: false,
            isControlCenterOpen: false,
            isPlaying: false,
            isWifiOn: true,
            isBluetoothOn: true,

            setBrightness: (value) => set({ brightness: value }),
            setVolume: (value) => set({ volume: value }),
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
            setDarkMode: (value) => set({ isDarkMode: value }),
            toggleControlCenter: () => set((state) => ({ isControlCenterOpen: !state.isControlCenterOpen })),
            setControlCenter: (value) => set({ isControlCenterOpen: value }),
            togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
            toggleWifi: () => set((state) => ({ isWifiOn: !state.isWifiOn })),
            toggleBluetooth: () => set((state) => ({ isBluetoothOn: !state.isBluetoothOn })),
        }),
        {
            name: "system-storage",
        }
    )
);

export default useSystemStore;
