/** @format */
import React from "react";
import {
    Sun,
    Moon,
    Volume2,
    Wifi,
    WifiOff,
    Bluetooth,
    Radio,
    Layers,
    Monitor,
    Play,
    Pause,
    FastForward,
    Music,
    Airplay,
} from "lucide-react";
import useSystemStore from "#store/system.js";
import clsx from "clsx";

const ControlCenter = ({ isOpen, onClose }) => {
    const {
        brightness,
        setBrightness,
        volume,
        setVolume,
        isDarkMode,
        toggleDarkMode,
        isPlaying,
        togglePlay,
        isWifiOn,
        toggleWifi,
        isBluetoothOn,
        toggleBluetooth,
    } = useSystemStore();

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-[45]" onClick={onClose} />

            <div className="absolute top-12 right-4 w-[350px] bg-[#1d1d1f]/80 backdrop-blur-2xl rounded-[2.5rem] p-4 shadow-2xl border border-white/10 z-50 select-none flex flex-col gap-3 text-white font-sans animate-in fade-in zoom-in-95 duration-200">
                {/* Top Grid: Connectivity & Toggles */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Connectivity Box */}
                    <div className="bg-white/10 p-3 rounded-2xl flex flex-col gap-4 border border-white/5">
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={toggleWifi}
                        >
                            <div
                                className={clsx(
                                    "size-7 rounded-full flex items-center justify-center transition-colors",
                                    isWifiOn ? "bg-blue-500" : "bg-white/10"
                                )}
                            >
                                {isWifiOn ? <Wifi size={14} fill="white" /> : <WifiOff size={14} />}
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[13px] font-semibold leading-tight">Wi-Fi</p>
                                <p className="text-[11px] text-gray-400 leading-tight">
                                    {isWifiOn ? "nishesh_fdmrh_5" : "Off"}
                                </p>
                            </div>
                        </div>
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={toggleBluetooth}
                        >
                            <div
                                className={clsx(
                                    "size-7 rounded-full flex items-center justify-center transition-colors",
                                    isBluetoothOn ? "bg-blue-500" : "bg-white/10"
                                )}
                            >
                                <Bluetooth
                                    size={14}
                                    fill={isBluetoothOn ? "white" : "none"}
                                />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[13px] font-semibold leading-tight">Bluetooth</p>
                                <p className="text-[11px] text-gray-400 leading-tight">
                                    {isBluetoothOn ? "On" : "Off"}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 opacity-60">
                            <div className="size-7 bg-white/10 rounded-full flex items-center justify-center">
                                <Radio size={14} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[13px] font-semibold leading-tight">AirDrop</p>
                                <p className="text-[11px] text-gray-400 leading-tight">Off</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side Toggles */}
                    <div className="flex flex-col gap-3">
                        {/* Dark Mode Toggle */}
                        <div
                            onClick={toggleDarkMode}
                            className={clsx(
                                "p-3 rounded-2xl flex items-center gap-3 border border-white/5 cursor-pointer transition-colors",
                                isDarkMode ? "bg-white/20" : "bg-white/10 hover:bg-white/15"
                            )}
                        >
                            <div className="size-7 bg-white/10 rounded-full flex items-center justify-center">
                                {isDarkMode ? (
                                    <Moon size={14} fill="white" />
                                ) : (
                                    <Sun size={14} />
                                )}
                            </div>
                            <p className="text-[13px] font-semibold">
                                {isDarkMode ? "Dark Mode" : "Light Mode"}
                            </p>
                        </div>

                        {/* Stage Manager & Mirroring */}
                        <div className="grid grid-cols-2 gap-3 h-full">
                            <div className="bg-white/10 p-2 rounded-2xl flex flex-col items-center justify-center gap-1 border border-white/5 cursor-pointer hover:bg-white/15 transition-colors">
                                <Layers size={18} className="text-gray-300" />
                                <p className="text-[9px] font-semibold text-center leading-tight">
                                    Stage <br /> Manager
                                </p>
                            </div>
                            <div className="bg-white/10 p-2 rounded-2xl flex flex-col items-center justify-center gap-1 border border-white/5 cursor-pointer hover:bg-white/15 transition-colors">
                                <Monitor size={18} className="text-gray-300" />
                                <p className="text-[9px] font-semibold text-center leading-tight">
                                    Screen <br /> Mirroring
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Display Slider */}
                <div className="bg-white/10 p-3 rounded-2xl border border-white/5 flex flex-col gap-2">
                    <p className="text-[11px] font-bold text-gray-300 px-1">Display</p>
                    <div className="relative h-7 bg-white/10 rounded-full overflow-hidden flex items-center group">
                        <div
                            className="absolute inset-y-0 left-0 bg-white transition-all duration-75"
                            style={{ width: `${brightness}%` }}
                        />
                        <Sun
                            size={14}
                            className={clsx(
                                "ml-3 z-10 transition-colors",
                                brightness > 50 ? "text-gray-600" : "text-gray-300"
                            )}
                        />
                        <input
                            type="range"
                            min="30"
                            max="100"
                            value={brightness}
                            onChange={(e) => setBrightness(parseInt(e.target.value))}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        />
                    </div>
                </div>

                {/* Sound Slider */}
                <div className="bg-white/10 p-3 rounded-2xl border border-white/5 flex flex-col gap-2">
                    <p className="text-[11px] font-bold text-gray-300 px-1">Sound</p>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 relative h-7 bg-white/10 rounded-full overflow-hidden flex items-center group">
                            <div
                                className="absolute inset-y-0 left-0 bg-white transition-all duration-75"
                                style={{ width: `${volume}%` }}
                            />
                            <Volume2
                                size={14}
                                className={clsx(
                                    "ml-3 z-10 transition-colors",
                                    volume > 50 ? "text-gray-600" : "text-gray-300"
                                )}
                            />
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={volume}
                                onChange={(e) => setVolume(parseInt(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                            />
                        </div>
                        <div className="size-8 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-400 transition-colors shadow-lg">
                            <Airplay size={16} />
                        </div>
                    </div>
                </div>

                {/* Music Player */}
                <div className="bg-white/10 p-3 rounded-2xl border border-white/5 flex items-center gap-4">
                    <div className="size-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg transform active:scale-95 transition-transform">
                        <Music size={24} color="white" fill="white" />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <p className="text-[14px] font-semibold leading-tight">Music</p>
                        <p className="text-[12px] text-gray-400 leading-tight">
                            {isPlaying ? "Playing Now..." : "Paused"}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-gray-300">
                        <div
                            onClick={togglePlay}
                            className="cursor-pointer hover:text-white transition-colors p-1"
                        >
                            {isPlaying ? (
                                <Pause size={20} fill="currentColor" />
                            ) : (
                                <Play size={20} fill="currentColor" />
                            )}
                        </div>
                        <div className="cursor-pointer hover:text-white transition-colors p-1">
                            <FastForward size={20} fill="currentColor" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ControlCenter;
