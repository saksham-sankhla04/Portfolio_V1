import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          animations: ["react-type-animation"],
        },
      },
    },
    // Minification settings
    minify: "esbuild",
    // Target modern browsers for smaller bundles
    target: "es2020",
    // Generate compressed assets
    cssMinify: true,
  },
});
