import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // 是否自动打开浏览器
    port: 8000, // 端口号 b端用 8000 c端用 3000

    // 代理解决跨域
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3001', // 接口源地址
        changeOrigin: true, // 开启跨域
        rewrite: path => path.replace('/^/api/', '')
      }
    }
  }
})
