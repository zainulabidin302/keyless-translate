import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ObpTranlateReact',
      fileName: 'index',
    },
    rollupOptions: {
      // Don't bundle react or our core lib
      external: ['react', 'react-dom', 'react/jsx-runtime', '@your-lib/core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@your-lib/core': 'YourLibCore',
        },
      },
    },
  },
});
