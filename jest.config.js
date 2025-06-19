// jest.config.js
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest", // use ts-jest preset
  testEnvironment: "jsdom", // simulate browser environment
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: [
    "<rootDir>/**/__tests__/**/*.(ts|tsx|js|jsx)",
    "<rootDir>/**/*.(spec|test).(ts|tsx|js|jsx)",
  ],
  // Avoid ignoring your transform for node_modules (if you need to transform ESM deps, adjust this)
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
