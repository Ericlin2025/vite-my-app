import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  assetsInclude: ['**/*.mp4'],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // ========== 新增配置 ==========
  server: {
    host: '0.0.0.0',    // 允许外部 IP 访问
    port: 5173,         // 端口号（可改）
    open: true,         // 自动打开浏览器（可选）
    
    // 如果有后端 API，配置代理
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  // 你的后端地址
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})