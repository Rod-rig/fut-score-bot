import { defineConfig, loadEnv } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd(), "");
  return {
    root: "./frontend",
    server: {
      proxy: {
        "/api": env.VITE_API_URL,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve("./frontend/src"),
        "@assets": path.resolve("./frontend/src/assets"),
        "@components": path.resolve("./frontend/src/components"),
      },
    },
    plugins: [react()],
  };
});
