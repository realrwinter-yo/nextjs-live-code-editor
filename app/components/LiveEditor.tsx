"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";

export default function LiveEditor() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [code, setCode] = useState({
    html: "<h1>Hello, World!</h1>",
    css: "h1 { color: red; }",
    javascript: 'console.log("JS works!");',
  });

  // Update iframe output when any of the three code inputs change
  useEffect(() => {
    const total = code.html.length + code.css.length + code.javascript.length;
    if (total > 100_000) return;

    if (/<script/i.test(code.html)) return;

    const htmlDoc = `
    <html>
      <head>
        <style>${code.css}</style>
      </head>
      <body>
        ${code.html}
        <script>${code.javascript}<\/script>
      </body>
    </html>
  `;

    const blob = new Blob([htmlDoc], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    if (iframeRef.current) iframeRef.current.src = url;
  }, [code]);

  const handleChange =
    (lang: "html" | "css" | "javascript") => (value: string | undefined) => {
      if (!value) return;
      setCode((prev) => ({ ...prev, [lang]: value }));
    };

  return (
    <>
      <h1 className=" text-4xl pt-10 px-20">Live Editor</h1>
      <p className="px-20 text-sm">Support HTML, CSS, JavaScript</p>

      <div className="w-full h-screen p-20 pt-10 pb-40 grid grid-cols-2 grid-rows-2 gap-4">
        <div className="flex flex-col border rounded overflow-hidden">
          <div className="bg-gray-900 text-white text-xs p-2">HTML</div>
          <Editor
            height="100%"
            defaultLanguage="html"
            language="html"
            theme="vs-dark"
            value={code.html}
            onChange={handleChange("html")}
          />
        </div>
        <div className="flex flex-col border rounded overflow-hidden">
          <div className="bg-gray-900 text-white text-xs p-2">CSS</div>
          <Editor
            height="100%"
            defaultLanguage="css"
            language="css"
            theme="vs-dark"
            value={code.css}
            onChange={handleChange("css")}
          />
        </div>
        <div className="flex flex-col border rounded overflow-hidden">
          <div className="bg-gray-900 text-white text-xs p-2">JavaScript</div>
          <Editor
            height="100%"
            defaultLanguage="javascript"
            language="javascript"
            theme="vs-dark"
            value={code.javascript}
            onChange={handleChange("javascript")}
          />
        </div>
        <div className="bg-white border rounded shadow overflow-auto">
          <iframe
            ref={iframeRef}
            className="w-full h-full border-0"
            title="Live Output"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </>
  );
}
