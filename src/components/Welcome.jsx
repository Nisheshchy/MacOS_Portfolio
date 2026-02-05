/** @format */
import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
  subtitle: { main: 100, max: 400, default: 100 },
  title: { main: 400, max: 900, default: 400 },
};


const rendertext = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{
        fontVariationSettings: `'wght' ${baseWeight}`,
        display: "inline-block",
      }}>
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { main, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();

      const distance = Math.abs(mouseX - (l - left + w / 2));

      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, main + (max - main) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.4);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const subtitleCleanUp = setupTextHover(subtitleRef.current, "subtitle");
    const titleCleanUp = setupTextHover(titleRef.current, "title");

    return () => {
      titleCleanUp();
      subtitleCleanUp();
    };
  }, []);

  return (
    <section
      id="Welcome"
      className="min-h-screen flex flex-col justify-center p-10">
      <p ref={subtitleRef}>
        {rendertext(
          "Hey Guys, I'm Nishesh! Welcome to my",
          "text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-7">
        {rendertext("Portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This Portfolio is designed for desktop/tab screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
