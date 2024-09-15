import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@app-src": path.resolve(__dirname, "./src/"),
      "@app-assets": path.resolve(__dirname, "./src/assets/"),
    },
  },
})
