/** @format */

import { locations } from "#constants";
import { useGSAP } from "@gsap/react";
import Draggable from "gsap/Draggable";
import useWindowStore from "#store/window.js";

import clsx from "clsx";

const projects = locations.work?.children ?? [];

const Home = () => {
  const { openWindow } = useWindowStore();
  const handleOPenProjectFinder = (project) => {
    openWindow("finder", project);
  };

  useGSAP(() => {
    Draggable.create(".folder");
  }, []);
  return (
    <section id="home">
      <ul>
        {projects.map((project) => (
          <li
            key={project.id}
            className={clsx("group folder", project.windowPosition)}
            onClick={() => handleOPenProjectFinder(project)}>
            <img
              src={project.icon || "/images/folder.png"}
              alt={project.name}
              className="w-16 h-16 object-contain"
            />
            <p className="mt-1">{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
