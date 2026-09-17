import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  preview: {
    allowedHosts: ['.trycloudflare.com'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        model: resolve(root, 'model.html'),
        model110: resolve(root, 'model-110.html'),
      },
    },
  },
});
