import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';  

export default defineConfig({
  base: "./",
  server: {
    port: 5174,
  },
  plugins: [
    vue(),
    legacy({
      targets:["defaults","not IE 11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
    })],
})