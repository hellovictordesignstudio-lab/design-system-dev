import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tokens':     resolve(__dirname, 'src/tokens'),
      '@theme':      resolve(__dirname, 'src/theme'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks':      resolve(__dirname, 'src/hooks'),
      '@utils':      resolve(__dirname, 'src/utils'),
    },
  },
});
