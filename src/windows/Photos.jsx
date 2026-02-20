/** @format */

import { Mail, Search } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";
import { gallery, photosLinks } from "#constants";

const Photos = () => {
  const { openWindow } = useWindowStore();

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Search className="icon" />
          <Mail className="icon" onClick={() => openWindow("contact")} />
        </div>
      </div>

      <div className="flex w-full">
        <div className="sidebar">
          <h3>Galleries</h3>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li key={id}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {gallery.map(({ id, img }) => (
              <li
                key={id}
                onClick={() =>
                  openWindow("imgfile", {
                    id,
                    name: "Gallery image",
                    icon: "/images/images.png",
                    kind: "file",
                    fileType: "img",
                    imageUrl: img,
                  })
                }>
                <img src={img} alt="Gallery" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
