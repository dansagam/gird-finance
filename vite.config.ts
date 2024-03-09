import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
//@ts-ignore
import * as path from "path";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgrPlugin(), react(), tsConfigPaths()],
  resolve: {
    // @ts-ignore
    alias: [{ find: "@/", replacement: path.resolve(__dirname, "./src/") }],
  },
  // @ts-ignore
  alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
});
