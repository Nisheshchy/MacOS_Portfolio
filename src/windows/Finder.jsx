/** @format */
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";
import clsx from "clsx";
import { Search } from "lucide-react";
import { locations } from "#constants";

import { useEffect } from "react";

const Finder = ({ data }) => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();

  useEffect(() => {
    if (data) {
      setActiveLocation(data);
    }
  }, [data, setActiveLocation]);

  const openItem = (item) => {
    // Implement the logic to open the item here
    if (item.kind === "folder") return setActiveLocation(item);
    if (item.fileType === "pdf") return openWindow("resume");
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank", "noopener,noreferrer");
    if (item.fileType === "txt") return openWindow("txtfile", item);
    if (item.fileType === "img") return openWindow("imgfile", item);

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation?.id ? "active" : "not-active",
            )}>
            <img src={item.icon} className="w-4" alt={item.name} />
            <p className="text-sm font-medium truncate">{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div id="window-header" className="flex items-center gap-4">
        <WindowControls target="finder" />
        <span className="font-semibold text-gray-700">{activeLocation?.name || "Finder"}</span>
        <div className="flex-1" />
        <Search className="icon size-4" />
      </div>

      <div className="bg-white flex h-[500px]">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
          {renderList("Work Project", locations.work?.children || [])}
        </div>

        <ul className="content grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] gap-4 p-6 auto-rows-max overflow-y-auto w-full">
          {activeLocation?.children &&
            activeLocation?.children.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-center gap-2 group cursor-pointer hover:bg-black/5 p-3 rounded-xl transition-all h-fit"
                onClick={() => openItem(item)}>
                <div className="relative p-1">
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="size-16 object-contain drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
                  />
                </div>
                <p className="text-[11px] text-center font-medium text-gray-800 break-words w-full px-1 line-clamp-2 leading-tight">
                  {item.name}
                </p>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
