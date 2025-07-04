import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // prefix /api with http://localhost:5000
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
