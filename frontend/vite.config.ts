import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vitest/config";

const currentDir = path.dirname(fileURLToPath(import.meta.url));

const README_VIRTUAL_MODULE_ID = "virtual:readme";
const RESOLVED_README_VIRTUAL_MODULE_ID = `\0${README_VIRTUAL_MODULE_ID}`;

const readmeSourcePlugin = (): Plugin => ({
  name: "readme-source",
  resolveId(id) {
    if (id === README_VIRTUAL_MODULE_ID) return RESOLVED_README_VIRTUAL_MODULE_ID;
  },
  load(id) {
    if (id !== RESOLVED_README_VIRTUAL_MODULE_ID) return;
    const readmePath = path.resolve(currentDir, "..", "README.md");
    const readmeContent = fs.readFileSync(readmePath, "utf-8");
    return `export default ${JSON.stringify(readmeContent)};`;
  }
});

export default defineConfig({
  base: "/weather-monitor/",
  plugins: [react(), readmeSourcePlugin()],
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./src/tests/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"]
  }
});
