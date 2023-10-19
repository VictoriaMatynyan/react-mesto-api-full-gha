import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // здесь был путь '/react-mesto-auth/' для деплоя на GH
  base: '/',
})
