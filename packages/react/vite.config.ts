import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
export default defineConfig({
  plugins: [
    react(),
    dts({
      // This tells dts to use the tsconfig for the build, respecting references
      tsconfigPath: './tsconfig.json',
    }),
    tsconfigPaths(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'KeylessTranslateReact', // Changed from YourLibReact
      fileName: 'index',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', '@zainulabidin302/keyless-translate-core'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          '@zainulabidin302/keyless-translate-core': 'KeylessTranslateCore',
        },
      },
    },
  },

});