/** @format */
import { Navbar, Welcome, Dock, Home } from "#components";
import {
  Finder,
  Resume,
  Safari,
  Terminal,
  Text,
  Image,
  Contact,
  Photos,
} from "#windows";

import useSystemStore from "#store/system";
import clsx from "clsx";

import ControlCenter from "./components/ControlCenter";

const App = () => {
  const { brightness, isDarkMode, isControlCenterOpen, setControlCenter } = useSystemStore();

  return (
    <main
      className={clsx(isDarkMode && "dark")}
      style={{ filter: `brightness(${brightness}%)` }}
    >
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal />
      <Safari />
      <Resume />
      <Finder />
      <Text />
      <Image />
      <Contact />
      <Photos />
      <Home />

      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setControlCenter(false)}
      />
    </main>
  );
};

export default App;
