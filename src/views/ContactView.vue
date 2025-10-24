<script setup>
import { ref } from 'vue'

// Contact form state
const contactForm = ref({
  name: '',
  email: '',
  message: '',
})
const contactLoading = ref(false)
const contactError = ref(null)
const contactSuccess = ref(null)

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
        email: contactForm.value.email,
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
    contactForm.value.email = ''
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
  <main class="contact-page">
    <div class="contact-header">
      <h1>📬 Get in Touch</h1>
      <p>Have a question or want to reach out? Send us a message!</p>
    </div>

    <div class="contact-container">
      <form @submit.prevent="submitContact" class="contact-form">
        <div class="form-group">
          <label for="name">Name *</label>
          <input
            id="name"
            v-model="contactForm.name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email (optional)</label>
          <input id="email" v-model="contactForm.email" type="email" placeholder="your@email.com" />
        </div>

        <div class="form-group">
          <label for="message">Message *</label>
          <textarea
            id="message"
            v-model="contactForm.message"
            placeholder="Enter your message"
            rows="6"
            required
          ></textarea>
        </div>

        <button type="submit" :disabled="contactLoading" class="submit-button">
          {{ contactLoading ? 'Sending...' : 'Send Message' }}
        </button>
      </form>

      <div v-if="contactError" class="error"><strong>❌ Error:</strong> {{ contactError }}</div>

      <div v-if="contactSuccess" class="success">
        <h3>✅ {{ contactSuccess.message }}</h3>
        <div class="success-details">
          <p>
            <strong>Submitted at:</strong>
            {{ new Date(contactSuccess.saved.timestamp).toLocaleString() }}
          </p>
          <p><strong>Reference ID:</strong> {{ contactSuccess.saved.id }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contact-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.contact-header p {
  font-size: 1.1rem;
  color: var(--color-text);
  opacity: 0.8;
}

.contact-container {
  background: var(--color-background-soft);
  border-radius: 12px;
  padding: 2.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contact-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-text);
  font-size: 0.95rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  background: var(--color-background);
  color: var(--color-text);
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #00dc82;
  box-shadow: 0 0 0 3px rgba(0, 220, 130, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-button {
  width: 100%;
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

.submit-button:hover:not(:disabled) {
  background: #00bd6f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 220, 130, 0.3);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error {
  margin-top: 1.5rem;
  padding: 1rem 1.25rem;
  background: #fef2f2;
  border: 2px solid #ef4444;
  border-radius: 8px;
  color: #991b1b;
}

.success {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #f0fdf4;
  border: 2px solid #22c55e;
  border-radius: 8px;
  color: #166534;
}

.success h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.success-details {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

.success-details p {
  margin: 0.5rem 0;
}

@media (max-width: 768px) {
  .contact-page {
    padding: 1rem;
  }

  .contact-header h1 {
    font-size: 2rem;
  }

  .contact-container {
    padding: 1.5rem;
  }
}
</style>
