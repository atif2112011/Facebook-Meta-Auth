import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: "./certs/cert.key",
      cert: "./certs/cert.crt",
    },
  },
});
