import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Meows_And_Blogs/', // 👈 Must match your GitHub repo name
})
