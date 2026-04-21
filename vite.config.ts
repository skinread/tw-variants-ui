import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(), 
    svgr(), 
    react(),
    dts({ 
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/react',
      rollupTypes: true
    })
  ],
  build: {
    outDir: 'dist/react',
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/components/react/index.ts'),
      name: 'TWVariantsUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: [
        'react', 
        'react-dom', 
        'react/jsx-runtime', 
        'tailwindcss', 
        'tailwind-variants', 
        '@headlessui/react', 
        'daisyui',
        'tailwind-merge'
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'tailwindcss': 'tailwindcss'
        }
      }
    }
  }
});
