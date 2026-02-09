/** @format */

import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper.jsx";
import { Download } from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const Resume = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>
        <a
          href="files/resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume">
          <Download className="icon" />
        </a>
      </div>

      <div className="flex-1 overflow-auto">
        <Document file="files/resume.pdf">
          <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
        </Document>
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;
