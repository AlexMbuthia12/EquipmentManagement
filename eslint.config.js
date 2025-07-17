import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 🟢 Common config for all files
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      ecmaVersion: "latest",
      sourceType: "module", // default to ESModules
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },

  // 🔵 Backend override (Node.js - allow require)
  {
    files: ["backend/**/*.js"],
    languageOptions: {
      sourceType: "script", // treat as CommonJS
      globals: globals.node,
    },
  },

  // 🟣 Frontend override (React + JSX)
  {
    files: ["frontend/src/**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
    },
  },
]);
