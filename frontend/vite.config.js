import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// No need to manually configure PostCSS here
export default defineConfig({
  plugins: [react()],
});