/** @format */

import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";

const Text = () => {
  const { windows } = useWindowStore();
  const { data } = windows.txtfile;

  if (!data) {
    return null;
  }

  const { name, image, subtitle, description = [] } = data;

  return (
    <div className="flex flex-col h-full bg-white">
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {image && (
          <img
            src={image}
            alt={name}
            className="w-full max-h-96 object-cover rounded mb-4"
          />
        )}

        {subtitle && <h3 className="text-lg font-semibold mb-4">{subtitle}</h3>}

        <div className="prose prose-sm max-w-none">
          {description.map((paragraph, index) => (
            <p
              key={index}
              className="mb-4 text-sm text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
