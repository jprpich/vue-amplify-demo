import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Configure Amplify
import { Amplify } from 'aws-amplify'

// Dynamically load the Amplify config if it exists
// Using fetch instead of import to avoid build-time errors
const configureAmplify = async () => {
  try {
    const response = await fetch('/amplify_outputs.json')
    if (response.ok) {
      const outputs = await response.json()
      Amplify.configure(outputs)
      console.log('✅ Amplify configured successfully')
    }
  } catch (error) {
    console.log('⚠️ Amplify config not found - run "npx ampx sandbox" to generate it')
  }
}

configureAmplify()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
