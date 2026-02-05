/** @format */

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window.js";
import { Draggable } from "gsap/Draggable";

// Register Draggable if not done globally
gsap.registerPlugin(Draggable);

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    // Handle Entry Animation
    useGSAP(
      () => {
        const el = ref.current;
        if (!el) return;

        if (isOpen) {
          gsap.set(el, { display: "block" });
          gsap.fromTo(
            el,
            { scale: 0.8, opacity: 0, y: 40 },
            { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
          );
        } else {
          gsap.set(el, { display: "none" });
        }
      },
      { dependencies: [isOpen], scope: ref },
    );

    // Handle Draggable Logic
    useGSAP(
      () => {
        const el = ref.current;
        if (!el) return;

        const instances = Draggable.create(el, {
          onPress: () => focusWindow(windowKey),
        });

        return () => {
          instances.forEach((ins) => ins.kill());
        };
      },
      { dependencies: [windowKey, focusWindow], scope: ref },
    );

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex, position: "absolute" }}
        className="window-container">
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
