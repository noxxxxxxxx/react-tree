import { resolve } from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import packageJson from './package.json'
import react from '@vitejs/plugin-react'
import copyFiles from 'vite-plugin-copy-files'

const externals = [...Object.keys(packageJson.peerDependencies), 'react/jsx-runtime']

export default defineConfig(({ mode }) => ({
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  plugins: [
    svgr(),
    react(),
    copyFiles({
      include: ['src/index.d.ts'],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.tsx'),
      name: 'Tree',
      formats: ['es', 'umd'],
      fileName: 'index',
    },
    copyPublicDir: false,
    rollupOptions: {
      external: externals,
      output: {
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM',
          'classnames': 'classNames',
          'react-redux': 'reactRedux',
          '@reduxjs/toolkit': 'RTK',
          'react/jsx-runtime': 'JSX',
        },
      },
    },
  },
}))
