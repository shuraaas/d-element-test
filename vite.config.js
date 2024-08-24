import { defineConfig } from 'vite';
import { resolve } from 'path';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@sass': resolve(__dirname, 'src/sass'),
      '@blocks': resolve(__dirname, 'src/blocks'),
    },
  },
  plugins: [eslintPlugin(), ViteMinifyPlugin()],
});
