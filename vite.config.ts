import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      treeshake:  false
    }
  },
  resolve: {
    alias: {
      "vue": "vue/dist/vue.esm-bundler.js"
    }
  }
})
