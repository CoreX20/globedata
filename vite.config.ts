import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://integrate.api.nvidia.com", // URL API tujuan
        changeOrigin: true, // Ubah origin header agar sesuai dengan server tujuan
        rewrite: (path) => path.replace(/^\/api/, ""), // Menghapus '/api' dari URL
      },
    },
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
