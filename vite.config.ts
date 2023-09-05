import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
// import dts from 'vite-plugin-dts'

export default defineConfig({
  esbuild: {
    drop: ['console', 'debugger'],
  },
  plugins: [
    react(),
    // dts({
    //   rollupTypes: false,
    //   copyDtsFiles: true,
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/lib/index.ts'),
      name: 'tree',
      formats: ['es', 'umd'],
      fileName: 'tree',
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      },
    },
  },
})
