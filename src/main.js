import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Configure Amplify (will be auto-generated when you run the sandbox)
import { Amplify } from 'aws-amplify'

// Try to import the generated config, if it exists
try {
  const outputs = await import('../amplify_outputs.json')
  Amplify.configure(outputs.default)
} catch {
  console.log('Amplify config not found - run "npx ampx sandbox" to generate it')
}

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
