import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");
  return {
    root: "./site",
    server: {
      proxy: {
        "/api": env.VITE_API_URL,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve("./site/src"),
        "@assets": path.resolve("./site/src/assets"),
        "@components": path.resolve("./site/src/components"),
      },
    },
    plugins: [react()],
  };
});
