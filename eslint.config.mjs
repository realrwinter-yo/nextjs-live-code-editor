/* eslint-disable prettier/prettier */
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({ baseDirectory: process.cwd() });

const config = [
  // Extend Next.js and Prettier recommended configs
  ...compat.extends("next/core-web-vitals", "plugin:prettier/recommended"),

  // Your global rules
  {
    rules: {
      "prettier/prettier": "error",
    },
  },

  // Relax strict rules for test files
  {
    files: ["**/__tests__/**/*.{ts,tsx}", "**/*.test.tsx"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "react/display-name": "off",
    },
  },
];

export default config;
