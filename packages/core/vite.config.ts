import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KeylessTranlateCore', // UMD build name
      fileName: 'index',
    },
  },
  plugins: [dts()], // This plugin generates the .d.ts type files
});
