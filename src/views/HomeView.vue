<script setup>
import { ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'

const apiResponse = ref(null)
const loading = ref(false)
const error = ref(null)

const callApi = async () => {
  loading.value = true
  error.value = null
  apiResponse.value = null

  try {
    // Import amplify_outputs to get the API endpoint
    const outputs = await import('../../amplify_outputs.json')

    // Get the custom API endpoint
    const apiEndpoint = outputs?.default?.custom?.API?.endpoint

    if (!apiEndpoint) {
      throw new Error(
        'API endpoint not configured. Make sure sandbox is running and amplify_outputs.json exists.',
      )
    }

    // Call the API directly using fetch
    const response = await fetch(`${apiEndpoint}hello`)

    if (!response.ok) {
      throw new Error(`API returned ${response.status}: ${response.statusText}`)
    }

    const body = await response.json()

    apiResponse.value = body
  } catch (err) {
    error.value = err.message || 'Failed to call API'
    console.error('Error calling API:', err)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <main>
    <TheWelcome />

    <div class="api-demo">
      <h2>🚀 Test Your Amplify API</h2>
      <p>Click the button below to call your serverless REST API!</p>

      <button @click="callApi" :disabled="loading" class="api-button">
        {{ loading ? 'Loading...' : 'Call API' }}
      </button>

      <div v-if="error" class="error">❌ Error: {{ error }}</div>

      <div v-if="apiResponse" class="success">
        <h3>✅ API Response:</h3>
        <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
      </div>
    </div>
  </main>
</template>

<style scoped>
.api-demo {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: var(--color-background-soft);
  border-radius: 8px;
  text-align: center;
}

.api-button {
  background: #00dc82;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  margin: 1rem 0;
  transition: all 0.3s ease;
}

.api-button:hover:not(:disabled) {
  background: #00bd6f;
  transform: translateY(-2px);
}

.api-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-top: 1rem;
  padding: 1rem;
  background: #fef2f2;
  border: 1px solid #ef4444;
  border-radius: 6px;
  color: #991b1b;
}

.success {
  margin-top: 1rem;
  padding: 1rem;
  background: #f0fdf4;
  border: 1px solid #22c55e;
  border-radius: 6px;
  text-align: left;
}

pre {
  background: white;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  text-align: left;
}
</style>
