import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "node:path";
import { normalizePath } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
  base: "/dist/",
  root: "public",
  build: {
    outDir: "../dist",
    emptyOutDir: true, // also necessary
    // assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash].[ext]",
        // chunkFileNames: "assets/js/[name]-[hash].js",
        // entryFileNames: "assets/js/[name]-[hash].js",
      },
    },
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: normalizePath(path.resolve(__dirname, "public/assets/*")), // Or a glob pattern like './static/**/*'
          dest: "assets", // Relative to dist, e.g., 'assets' or '.' for root
        },
        // Add more targets as needed
      ],
    }),
  ],
});
