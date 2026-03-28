import { defineConfig } from 'vite'   // 👈 THIS LINE IS MISSING
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/finalproject/',   // your repo name
  plugins: [react()],
})