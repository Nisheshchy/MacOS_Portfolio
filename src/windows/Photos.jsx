/** @format */

import { useState, useMemo, useEffect } from "react";
import { Mail, Search, Heart } from "lucide-react";
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import useWindowStore from "#store/window";
import { gallery, photosLinks } from "#constants";

const Photos = () => {
  const { openWindow } = useWindowStore();
  const [selectedGallery, setSelectedGallery] = useState("Library");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("photo-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("photo-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const filteredGallery = useMemo(() => {
    if (selectedGallery === "Library") return gallery;
    if (selectedGallery === "Favorites") {
      return gallery.filter((item) => favorites.includes(item.id));
    }
    return gallery.filter((item) =>
      item.categories?.includes(selectedGallery)
    );
  }, [selectedGallery, favorites]);

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <div className="w-full flex justify-end items-center gap-3 text-gray-500">
          <Search className="icon" />
          <Mail className="icon" onClick={() => openWindow("contact")} />
        </div>
      </div>

      <div className="flex w-full h-full overflow-hidden">
        <div className="sidebar overflow-y-auto">
          <h3>Galleries</h3>
          <ul>
            {photosLinks.map(({ id, icon, title }) => (
              <li
                key={id}
                className={selectedGallery === title ? "active" : "not-active"}
                onClick={() => setSelectedGallery(title)}>
                <img src={icon} alt={title} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery flex-1 overflow-y-auto p-5">
          {filteredGallery.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>No photos found in {selectedGallery}</p>
            </div>
          ) : (
            <ul>
              {filteredGallery.map(({ id, img }) => (
                <li
                  key={id}
                  className="relative group cursor-pointer"
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
                  <img src={img} alt="Gallery" className="transition-transform group-hover:scale-[1.02]" />
                  <div
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => toggleFavorite(e, id)}>
                    <Heart
                      className={`size-4 ${favorites.includes(id)
                        ? "fill-red-500 text-red-500"
                        : "text-white"
                        }`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;
