<script setup>
import { ref } from 'vue'

const apiResponse = ref(null)
const loading = ref(false)
const error = ref(null)

const callApi = async () => {
  loading.value = true
  error.value = null
  apiResponse.value = null

  try {
    // Load amplify_outputs to get the API endpoint
    let outputs
    try {
      const response = await fetch('/amplify_outputs.json')
      if (!response.ok) {
        throw new Error('Config file not found')
      }
      outputs = await response.json()
    } catch (importError) {
      throw new Error(
        'API configuration not found. Make sure the Amplify backend is deployed. Run "npm run sandbox" for local development.',
      )
    }

    // Get the custom API endpoint
    const apiEndpoint = outputs?.custom?.API?.endpoint

    if (!apiEndpoint) {
      throw new Error('API endpoint not found in configuration.')
    }

    console.log('Calling API at:', apiEndpoint)

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
  <main class="api-test-page">
    <div class="test-header">
      <h1>🚀 API GET Request</h1>
      <p>Test your serverless REST API with a GET endpoint</p>
    </div>

    <div class="test-container">
      <div class="endpoint-info">
        <h3>GET /hello</h3>
        <p>This endpoint returns a simple hello message from your AWS Lambda function.</p>
      </div>

      <button @click="callApi" :disabled="loading" class="test-button">
        {{ loading ? 'Loading...' : 'Call API' }}
      </button>

      <div v-if="error" class="error"><strong>❌ Error:</strong> {{ error }}</div>

      <div v-if="apiResponse" class="success">
        <h3>✅ API Response</h3>
        <div class="response-details">
          <div class="response-item">
            <span class="label">Message:</span>
            <span class="value">{{ apiResponse.message }}</span>
          </div>
          <div class="response-item">
            <span class="label">Timestamp:</span>
            <span class="value">{{ new Date(apiResponse.timestamp).toLocaleString() }}</span>
          </div>
          <div class="response-item">
            <span class="label">Path:</span>
            <span class="value">{{ apiResponse.path }}</span>
          </div>
          <div class="response-item">
            <span class="label">Method:</span>
            <span class="value">{{ apiResponse.method }}</span>
          </div>
        </div>

        <details class="raw-response">
          <summary>View Raw JSON Response</summary>
          <pre>{{ JSON.stringify(apiResponse, null, 2) }}</pre>
        </details>
      </div>

      <div class="info-box">
        <h4>💡 About this API</h4>
        <ul>
          <li>This is a serverless REST API powered by AWS Lambda</li>
          <li>The endpoint is deployed via AWS Amplify Gen 2</li>
          <li>Responses are returned in JSON format</li>
          <li>CORS is enabled for cross-origin requests</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
.api-test-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
}

.test-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.test-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.test-header p {
  font-size: 1.05rem;
  color: var(--color-text);
  opacity: 0.85;
}

.test-container {
  background: var(--color-background-soft);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.endpoint-info {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid var(--color-border);
}

.endpoint-info h3 {
  font-size: 1.5rem;
  color: #00dc82;
  font-family: 'Monaco', 'Courier New', monospace;
  margin-bottom: 0.5rem;
}

.endpoint-info p {
  color: var(--color-text);
  opacity: 0.8;
}

.test-button {
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 0 auto 2rem;
  background: #00dc82;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.test-button:hover:not(:disabled) {
  background: #00bd6f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 220, 130, 0.3);
}

.test-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;
  background: #fef2f2;
  border: 2px solid #ef4444;
  border-radius: 8px;
  color: #991b1b;
}

.success {
  margin-bottom: 2rem;
}

.success h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  color: #166534;
}

.response-details {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 2px solid #22c55e;
}

.response-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
}

.response-item:last-child {
  border-bottom: none;
}

.response-item .label {
  font-weight: 600;
  color: var(--color-text);
}

.response-item .value {
  color: var(--color-text);
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
}

.raw-response {
  margin-top: 1rem;
  background: #f8f9fa;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 1rem;
}

.raw-response summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--color-text);
  user-select: none;
}

.raw-response summary:hover {
  color: #00dc82;
}

.raw-response pre {
  margin-top: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.85rem;
  color: var(--color-text);
}

.info-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin-top: 2rem;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.2);
}

.info-box h4 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
  font-weight: 600;
}

.info-box ul {
  margin: 0;
  padding-left: 1.5rem;
}

.info-box li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.info-box li:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .api-test-page {
    padding: 1rem 0.5rem;
  }

  .test-header {
    margin-bottom: 2rem;
  }

  .test-header h1 {
    font-size: 2rem;
  }

  .test-header p {
    font-size: 1rem;
  }

  .test-container {
    padding: 1.25rem;
  }

  .endpoint-info h3 {
    font-size: 1.2rem;
  }

  .test-button {
    font-size: 1rem;
    padding: 0.875rem 1.5rem;
  }

  .response-item {
    flex-direction: column;
    gap: 0.25rem;
  }

  .info-box {
    padding: 1.25rem;
  }
}
</style>
