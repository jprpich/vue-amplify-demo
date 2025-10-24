<script setup>
import { ref, onMounted } from 'vue'

const contacts = ref([])
const loading = ref(false)
const error = ref(null)

const fetchContacts = async () => {
  loading.value = true
  error.value = null

  try {
    // Load amplify_outputs to get the API configuration
    const response = await fetch('/amplify_outputs.json')
    if (!response.ok) {
      throw new Error('API configuration not found. Make sure the Amplify backend is deployed.')
    }
    const outputs = await response.json()

    const apiUrl = outputs?.data?.url
    const apiKey = outputs?.data?.api_key

    if (!apiUrl || !apiKey) {
      throw new Error('AppSync API configuration not found.')
    }

    console.log('Fetching contacts from AppSync:', apiUrl)

    // GraphQL query to list all contacts
    const query = `
      query ListContacts {
        listContacts {
          items {
            id
            name
            email
            message
            createdAt
            updatedAt
          }
        }
      }
    `

    // Call AppSync GraphQL API
    const graphqlResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ query }),
    })

    if (!graphqlResponse.ok) {
      throw new Error(
        `GraphQL API returned ${graphqlResponse.status}: ${graphqlResponse.statusText}`,
      )
    }

    const result = await graphqlResponse.json()

    if (result.errors) {
      throw new Error(result.errors[0].message)
    }

    contacts.value = result.data.listContacts.items
    // Sort by newest first
    contacts.value.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  } catch (err) {
    error.value = err.message || 'Failed to fetch contacts'
    console.error('Error fetching contacts:', err)
  } finally {
    loading.value = false
  }
}

// Fetch contacts when component mounts
onMounted(() => {
  fetchContacts()
})

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleString()
}
</script>

<template>
  <main class="contacts-list-page">
    <div class="page-header">
      <h1>📋 All Contacts</h1>
      <p>View all contact form submissions stored in DynamoDB</p>
    </div>

    <div class="page-container">
      <div v-if="error" class="error"><strong>❌ Error:</strong> {{ error }}</div>

      <div v-if="loading" class="loading">
        <div class="spinner"></div>
        <p>Loading contacts...</p>
      </div>

      <div v-if="!loading && contacts.length === 0 && !error" class="empty-state">
        <div class="empty-icon">📭</div>
        <h3>No contacts yet</h3>
        <p>Submit the contact form to see entries here!</p>
        <router-link to="/contact" class="cta-link">Go to Contact Form →</router-link>
      </div>

      <div v-if="!loading && contacts.length > 0" class="table-container">
        <table class="contacts-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Submitted</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="contact in contacts" :key="contact.id" class="contact-row">
              <td class="name-cell">{{ contact.name }}</td>
              <td class="email-cell">{{ contact.email || 'N/A' }}</td>
              <td class="message-cell">
                <div class="message-content">{{ contact.message }}</div>
              </td>
              <td class="date-cell">
                {{ formatDate(contact.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="info-box" v-if="!loading && contacts.length > 0">
        <h4>💡 About This Data</h4>
        <ul>
          <li>
            Data is fetched from <strong>DynamoDB</strong> via <strong>AppSync GraphQL API</strong>
          </li>
          <li>Uses the <code>listContacts</code> query with API key authentication</li>
          <li>Sorted by newest submissions first</li>
          <li>Refresh anytime to see new submissions</li>
        </ul>
      </div>
    </div>
  </main>
</template>

<style scoped>
.contacts-list-page {
  min-height: 100vh;
  padding: 2rem 1rem;
  background: var(--color-background);
}

.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
}

.page-header p {
  font-size: 1.05rem;
  color: var(--color-text);
  opacity: 0.85;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

/* Error */
.error {
  padding: 1rem 1.25rem;
  background: #fef2f2;
  border: 2px solid #ef4444;
  border-radius: 8px;
  color: #991b1b;
  margin-bottom: 2rem;
}

/* Loading */
.loading {
  text-align: center;
  padding: 4rem 2rem;
}

.spinner {
  border: 4px solid var(--color-border);
  border-top: 4px solid #00dc82;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: var(--color-background-soft);
  border-radius: 12px;
  margin-bottom: 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.empty-state p {
  font-size: 1.05rem;
  color: var(--color-text);
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

.cta-link {
  display: inline-block;
  background: #00dc82;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-link:hover {
  background: #00bd6f;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 220, 130, 0.3);
}

/* Table Container */
.table-container {
  background: var(--color-background-soft);
  border-radius: 12px;
  overflow-x: auto;
  overflow-y: visible;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.contacts-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

/* Table Header */
.contacts-table thead {
  background: var(--color-background-mute);
  border-bottom: 2px solid var(--color-border);
}

.contacts-table th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: var(--color-heading);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Table Body */
.contacts-table tbody tr {
  border-bottom: 1px solid var(--color-border);
  transition: background-color 0.2s ease;
}

.contacts-table tbody tr:last-child {
  border-bottom: none;
}

.contacts-table tbody tr:hover {
  background: var(--color-background);
}

.contacts-table td {
  padding: 1rem;
  vertical-align: top;
}

/* Cell Styles */
.name-cell {
  font-weight: 600;
  color: var(--color-heading);
  font-size: 1.05rem;
  width: 15%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.email-cell {
  color: var(--color-text);
  opacity: 0.85;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  width: 20%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.message-cell {
  width: 47%;
}

.message-content {
  color: var(--color-text);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-cell {
  font-size: 0.85rem;
  color: var(--color-text);
  width: 18%;
  word-wrap: break-word;
  line-height: 1.4;
}

/* Info Box */
.info-box {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
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

.info-box code {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-family: 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .contacts-list-page {
    padding: 1rem 0.5rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .page-header p {
    font-size: 1rem;
  }

  .table-container {
    overflow-x: auto;
  }

  .contacts-table {
    min-width: 600px;
  }

  .contacts-table th,
  .contacts-table td {
    padding: 0.75rem 0.5rem;
    font-size: 0.9rem;
  }

  .message-cell {
    max-width: 250px;
  }

  .info-box {
    padding: 1.25rem;
  }
}
</style>
