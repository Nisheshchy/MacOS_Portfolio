/** @format */

import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const Image = () => {
  const { windows } = useWindowStore();
  const { data } = windows.imgfile;

  if (!data) {
    return null;
  }

  const { name, imageUrl } = data;

  return (
    <div className="flex flex-col h-full bg-white">
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="flex-1 overflow-auto flex items-center justify-center p-4">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>
    </div>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
