import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("three")) return "vendor-three";
            if (id.includes("framer-motion") || id.includes("motion"))
              return "vendor-motion";
            if (id.includes("react-router-dom") || id.includes("@remix-run"))
              return "vendor-react-router";
            if (id.includes("radix-ui")) return "vendor-radix";
            // return "vendor"; // Let Vite split the rest
          }
        },
      },
    },
  },
});
