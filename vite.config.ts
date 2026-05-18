import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  fmt: {
    ignorePatterns: ['dist', 'example', 'node_modules'],
    singleQuote: true,
    sortImports: {
      enabled: true,
    },
  },
  lint: {
    ignorePatterns: ['dist', 'example', 'node_modules'],
    rules: {
      'typescript/require-await': 'error',
    },
    options: { typeAware: true, typeCheck: true },
  },
  test: {
    environment: 'jsdom',
  },
  pack: {
    entry: 'index.ts',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    outExtensions: ({ format }) => ({
      js: format === 'cjs' ? '.cjs' : '.js',
    }),
  },
});
