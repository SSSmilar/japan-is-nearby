import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: mode === 'production' ? '/japan-is-nearby/' : '/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    host: "::",
    port: 3000,
    strictPort: true,
  },
}));
