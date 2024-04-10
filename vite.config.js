import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");
  return {
    root: "./site/client",
    server: {
      proxy: {
        "/api": env.VITE_API_URL,
      },
    },
    build: {
      outDir: path.resolve("./dist"),
    },
    resolve: {
      alias: {
        "@": path.resolve("./site/client/src"),
        "@assets": path.resolve("./site/client/src/assets"),
        "@components": path.resolve("./site/client/src/components"),
      },
    },
    plugins: [react()],
  };
});
