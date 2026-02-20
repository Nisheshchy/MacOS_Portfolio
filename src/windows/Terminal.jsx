/** @format */
import WindowWrapper from "#hoc/WindowWrapper";
import { WindowControls } from "#components";
import { techStack } from "#constants";
import { Check, Flag } from "lucide-react";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@nisheshchaudhary% </span>
          show tech stack
        </p>

        <div className="lable">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li key={category} className="flex items-center">
              <Check className="check" size={20} />
              <h3 className="font-semibold mr-2">{category}:</h3>
              <p>
                {items.map((item, i) => (
                  <span key={item}>
                    {item}
                    {i < items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p className="flex items-center gap-1">
            <Check size={20} /> {techStack.length} of {techStack.length} stacks
            loaded. (50%)
          </p>

          <p className="flex items-center gap-1">
            <Flag size={15} fill="currentColor" /> End of tech stack.
          </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
