import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html', // 분석 결과 파일 경로
      open: true, // 빌드 완료 시 자동으로 stats.html 열기
      gzipSize: true, // gzip 크기 표시
      brotliSize: true, // brotli 크기 표시
    }),
  ],
  esbuild: {
    jsxImportSource: '@emotion/react',
    jsxFactory: '_jsx',
    jsxFragment: '_jsxFragment',
    jsxInject: `import { jsx as _jsx, jsxs as _jsxs, Fragment as _jsxFragment } from 'react/jsx-runtime'`,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@shared': path.resolve(__dirname, 'src/components/shared'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@constants': path.resolve(__dirname, 'src/constants'),
    },
  },
})
