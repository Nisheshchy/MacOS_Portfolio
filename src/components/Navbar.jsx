/** @format */
import dayjs from "dayjs";
import { navIcons, navLinks } from "#constants";
import useWindowStore from "#store/window";


import useSystemStore from "#store/system";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const { toggleControlCenter } = useSystemStore();

  const handleNavClick = (type) => {
    console.log("Opening window:", type);
    openWindow(type);
  };

  const handleIconClick = (id) => {
    if (id === 4) {
      toggleControlCenter();
    }
  };

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="logo" />
        <p className="font-bold">Nishesh's Portfolio</p>
        <ul>
          {navLinks.map(({ id, name, type }) => (
            <li
              key={id}
              onClick={() => handleNavClick(type)}
              className="cursor-pointer select-none"
              style={{ pointerEvents: "auto" }}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id} onClick={() => handleIconClick(id)}>
              <img src={img} className="icon-hover" alt={`icon-${id}`} />
            </li>
          ))}
        </ul>
        <time> {dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  );
};
export default Navbar;
