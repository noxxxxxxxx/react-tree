import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
// import dts from 'vite-plugin-dts'

export default defineConfig(({ mode }) => ({
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
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
      entry: path.resolve(__dirname, './src/index.tsx'),
      name: 'Tree',
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
}))
