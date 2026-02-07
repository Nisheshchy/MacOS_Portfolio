/** @format */

import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import {
  Search,
  Share,
  ShieldHalf,
  ChevronLeft,
  ChevronRight,
  Plus,
  Copy,
  MoveRight,
  PanelLeft,
} from "lucide-react";

const Safari = () => {
  return (
    <div className="flex flex-col h-full bg-white text-black">
      {/* Header / Toolbar */}
      <div id="window-header" className="flex items-center p-3 border-b">
        <WindowControls target="safari" />

        <PanelLeft className="ml-10 icon" />
        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex items-center justify-center gap-3">
          <ShieldHalf className="icon" />
          <div className="search flex items-center bg-gray-100 rounded-md px-2 py-1 w-full max-w-md">
            <Search className="icon size-4 mr-2" />
            <input
              type="text"
              placeholder="Search or enter website name"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 ml-4">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="blog overflow-y-auto p-8">
        <h2 className="text-2xl font-bold mb-6">My Developer Blog</h2>
        <div className="space-y-12">
          {blogPosts.map(({ id, title, description, link, date, image }) => (
            <div
              key={id}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b pb-8">
              {/* Image Container */}
              <div className="col-span-1">
                <img
                  src={image}
                  alt={title}
                  className="rounded-lg object-cover w-full h-48"
                />
              </div>

              {/* Text Content */}
              <div className="content col-span-2">
                <p className="text-sm text-gray-500">{date}</p>
                <h3 className="text-xl font-semibold my-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline">
                  Check out the full post <MoveRight className="size-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
