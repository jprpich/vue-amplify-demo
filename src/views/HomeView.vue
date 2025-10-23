<script setup>
import { ref } from 'vue'
import TheWelcome from '../components/TheWelcome.vue'

const apiResponse = ref(null)
const loading = ref(false)
const error = ref(null)

// Contact form state
const contactForm = ref({
  name: '',
  message: '',
})
const contactLoading = ref(false)
const contactError = ref(null)
const contactSuccess = ref(null)

const callApi = async () => {
  loading.value = true
  error.value = null
  apiResponse.value = null

  try {
    // Load amplify_outputs to get the API endpoint
    // Using fetch to avoid build-time errors if file doesn't exist
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

const submitContact = async () => {
  contactLoading.value = true
  contactError.value = null
  contactSuccess.value = null

  try {
    // Get API endpoint
    const response = await fetch('/amplify_outputs.json')
    if (!response.ok) {
      throw new Error('API configuration not found. Make sure sandbox is running.')
    }
    const outputs = await response.json()
    const apiEndpoint = outputs?.custom?.API?.endpoint

    if (!apiEndpoint) {
      throw new Error('API endpoint not found in configuration.')
    }

    console.log('Submitting contact form to:', apiEndpoint)

    // Submit contact form
    const contactResponse = await fetch(`${apiEndpoint}contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contactForm.value.name,
        message: contactForm.value.message,
      }),
    })

    const data = await contactResponse.json()

    if (!contactResponse.ok) {
      throw new Error(data.error || 'Failed to submit contact form')
    }

    contactSuccess.value = data
    // Clear form on success
    contactForm.value.name = ''
    contactForm.value.message = ''
  } catch (err) {
    contactError.value = err.message || 'Failed to submit contact form'
    console.error('Error submitting contact form:', err)
  } finally {
    contactLoading.value = false
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

    <!-- Contact Form -->
    <div class="contact-demo">
      <h2>📬 Test Contact Form (POST Request)</h2>
      <p>Submit a message to test the POST /contact endpoint</p>

      <form @submit.prevent="submitContact" class="contact-form">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            id="name"
            v-model="contactForm.name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>

        <div class="form-group">
          <label for="message">Message:</label>
          <textarea
            id="message"
            v-model="contactForm.message"
            placeholder="Enter your message"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" :disabled="contactLoading" class="submit-button">
          {{ contactLoading ? 'Sending...' : 'Send Message' }}
        </button>
      </form>

      <div v-if="contactError" class="error">❌ Error: {{ contactError }}</div>

      <div v-if="contactSuccess" class="success">
        <h3>✅ Success!</h3>
        <pre>{{ JSON.stringify(contactSuccess, null, 2) }}</pre>
      </div>
    </div>
  </main>
</template>

<style scoped>
.api-demo,
.contact-demo {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: var(--color-background-soft);
  border-radius: 8px;
  text-align: center;
}

.api-button,
.submit-button {
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

.api-button:hover:not(:disabled),
.submit-button:hover:not(:disabled) {
  background: #00bd6f;
  transform: translateY(-2px);
}

.api-button:disabled,
.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.contact-form {
  margin-top: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--color-text);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  font-size: 16px;
  font-family: inherit;
  background: var(--color-background);
  color: var(--color-text);
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00dc82;
}

.form-group textarea {
  resize: vertical;
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
