import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { copyFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Plugin to copy amplify_outputs.json to dist if it exists
const copyAmplifyOutputs = () => ({
  name: 'copy-amplify-outputs',
  closeBundle() {
    const source = resolve(__dirname, 'amplify_outputs.json')
    const dest = resolve(__dirname, 'dist', 'amplify_outputs.json')
    if (existsSync(source)) {
      copyFileSync(source, dest)
      console.log('✅ Copied amplify_outputs.json to dist/')
    } else {
      console.log('⚠️ amplify_outputs.json not found - will be loaded from backend at runtime')
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), copyAmplifyOutputs()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
