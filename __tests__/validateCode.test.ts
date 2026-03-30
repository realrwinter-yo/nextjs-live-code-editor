import { validateCode } from "../lib/validateCode";

describe("validateCode", () => {
  it("rejects HTML with a bare script tag", () => {
    const result = validateCode("<script>alert('xss')</script>", "", "");
    expect(result.valid).toBe(false);
  });

  it("rejects HTML with a script tag that has attributes", () => {
    // <script src="evil.js"> is a valid XSS vector and must be rejected
    const result = validateCode('<script src="evil.js"></script>', "", "");
    expect(result.valid).toBe(false);
  });

  it("rejects HTML with an async script tag", () => {
    const result = validateCode("<script async></script>", "", "");
    expect(result.valid).toBe(false);
  });

  it("rejects mixed-case script tags", () => {
    const result = validateCode("<SCRIPT>alert(1)</SCRIPT>", "", "");
    expect(result.valid).toBe(false);
  });

  it("allows valid HTML without script tags", () => {
    const result = validateCode("<h1>Hello</h1>", "h1 { color: red; }", "");
    expect(result.valid).toBe(true);
  });

  it("rejects code that exceeds the size limit", () => {
    const html = "a".repeat(100_001);
    const result = validateCode(html, "", "");
    expect(result.valid).toBe(false);
  });
});
