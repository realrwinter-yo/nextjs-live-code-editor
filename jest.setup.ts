// jest.setup.ts

import "@testing-library/jest-dom";

// Polyfill createObjectURL for tests
Object.defineProperty(global.URL, "createObjectURL", {
  writable: true,
  value: jest.fn().mockReturnValue("blob://test"),
});
