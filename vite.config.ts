import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { blogContent } from "./script/blog-content";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss(), blogContent()],
  define: {
    "import.meta.env.VITE_BUILD_YEAR": JSON.stringify(String(new Date().getFullYear())),
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, isSsrBuild ? "dist/server" : "dist/public"),
    emptyOutDir: true,
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              "vendor-react": ["react", "react-dom", "react-dom/client"],
            },
          },
        },
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
}));
