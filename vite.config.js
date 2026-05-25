import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: false,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets'
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: []
  }
});
