// __tests__/LiveEditor.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LiveEditor from "../app/components/LiveEditor";
import "@testing-library/jest-dom";

// Mock Monaco Editor without JSX
jest.mock("@monaco-editor/react", () => {
  const React = require("react");
  return (props: any) =>
    React.createElement("textarea", {
      "data-testid": `editor-${props.language}`,
      value: props.value,
      onChange: (e: any) => props.onChange(e.target.value),
    });
});

describe("LiveEditor", () => {
  beforeEach(() => {
    // Reset our URL.createObjectURL spy before each test
    jest.resetAllMocks();
  });

  it("renders HTML, CSS, JS editors and output iframe", () => {
    // Spy on createObjectURL so we can track calls
    jest.spyOn(URL, "createObjectURL").mockReturnValue("blob://test");

    render(<LiveEditor />);

    expect(screen.getByTestId("editor-html")).toBeInTheDocument();
    expect(screen.getByTestId("editor-css")).toBeInTheDocument();
    expect(screen.getByTestId("editor-javascript")).toBeInTheDocument();
    expect(screen.getByTitle("Live Output")).toBeInTheDocument();

    // Initial render should call createObjectURL once
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
  });

  it("calls createObjectURL again when HTML code changes", () => {
    const spy = jest
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob://test");

    render(<LiveEditor />);

    // initial call
    expect(spy).toHaveBeenCalledTimes(1);

    // Change the HTML editor content
    const htmlEditor = screen.getByTestId("editor-html") as HTMLTextAreaElement;
    fireEvent.change(htmlEditor, {
      target: { value: "<h2>Test Heading</h2>" },
    });

    // After change, effect should run again
    expect(spy).toHaveBeenCalledTimes(2);
  });
});
