import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: '/japan-is-nearby/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    host: "::",
    port: 3000,
    strictPort: true,
  },
});
