import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: './index.ts',
      name: 'react-onesignal',
      formats: ['es', 'cjs'],
      fileName: (format) => {
        if (format === 'es') {
          return 'index.js';
        }
        return 'index.cjs';
      },
    },
  },
  plugins: [dts()],
});
