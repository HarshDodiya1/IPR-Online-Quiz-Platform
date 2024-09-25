import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', 
    proxy: {
      "/api": "https://backend-ipr.vercel.app",
      secure: false,
    },
  },
  plugins: [react()],
});