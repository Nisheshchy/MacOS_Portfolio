/** @format */
import WindowWrapper from "#hoc/WindowWrapper";
import { socials } from "#constants";
import { WindowControls } from "#components";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>
      <div className="p-5 space-y-5">
        <img
          src="/images/nishesh-1.jpg"
          alt="Nishesh"
          className="w-30 rounded-full"
        />
        <h3>Let's Connect</h3>
        <p> Got an idea? A bug to squash? Or just wanna talk teach? I'm in. </p>

        <ul>
          {socials.map(({ id, bg, icon, link, text }) => (
            <li key={id} style={{ background: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}>
                <img src={icon} alt={text} className="size-5" />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
