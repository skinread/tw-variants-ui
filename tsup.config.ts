import { defineConfig } from 'tsup';
import svgr from 'esbuild-plugin-svgr';

// moved most config to cli

export default defineConfig({
  dts: true,
  // entry: ['src/components/react/index.ts'],
  external: ['react'],
  format: ['cjs', 'esm'],
  // outDir: 'dist/',
  // sourcemap: true,
  splitting: false,
  esbuildPlugins: [svgr()],
});
