/** @format */

import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import { ZoomIn, ZoomOut, RotateCw, Share, Maximize2 } from "lucide-react";

const Image = () => {
  const { windows } = useWindowStore();
  const { data } = windows.imgfile;

  if (!data) {
    return null;
  }

  const { name, imageUrl } = data;

  return (
    <div className="flex flex-col h-full bg-white select-none">
      <div id="window-header">
        <div className="flex items-center gap-4">
          <WindowControls target="imgfile" />
          <div className="flex items-center gap-2 text-gray-400">
            <ZoomOut className="size-4 cursor-pointer hover:text-gray-600 transition-colors" />
            <ZoomIn className="size-4 cursor-pointer hover:text-gray-600 transition-colors" />
          </div>
        </div>

        <p className="font-bold text-[#5f6266] truncate max-w-[200px]">
          {name}
        </p>

        <div className="flex items-center gap-4 text-gray-400">
          <RotateCw className="size-4 cursor-pointer hover:text-gray-600 transition-colors" />
          <Share className="size-4 cursor-pointer hover:text-gray-600 transition-colors" />
          <Maximize2 className="size-4 cursor-pointer hover:text-gray-600 transition-colors" />
        </div>
      </div>

      <div className="preview flex-1 overflow-auto flex items-center justify-center p-4 bg-gray-100/50">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain shadow-lg rounded-sm"
          />
        )}
      </div>
    </div>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
