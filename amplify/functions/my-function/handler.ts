import type { APIGatewayProxyHandler } from 'aws-lambda'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

// Initialize DynamoDB client
const client = new DynamoDBClient({})
const docClient = DynamoDBDocumentClient.from(client)

// Get table name from environment variable (set by Amplify)
const tableName = process.env.CONTACT_TABLE_NAME

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('Event:', event)

  // Handle different paths
  const path = event.path
  const method = event.httpMethod

  // GET /hello
  if (method === 'GET' && path === '/hello') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Hello from your Amplify API! 🚀',
        timestamp: new Date().toISOString(),
        path: event.path,
        method: event.httpMethod,
      }),
    }
  }

  // GET /contacts - List all contacts
  if (method === 'GET' && path === '/contacts') {
    try {
      console.log('Scanning DynamoDB table:', tableName)

      const command = new ScanCommand({
        TableName: tableName,
      })

      const result = await docClient.send(command)

      console.log('DynamoDB Scan result:', {
        itemCount: result.Items?.length || 0,
        scannedCount: result.ScannedCount,
      })

      // Sort by newest first
      const contacts = (result.Items || []).sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return dateB - dateA
      })

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          contacts,
          count: contacts.length,
          tableName: tableName, // Added for debugging
        }),
      }
    } catch (error) {
      console.error('Error fetching contacts:', error)
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Failed to fetch contacts',
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
      }
    }
  }

  // POST /contact
  if (method === 'POST' && path === '/contact') {
    try {
      // Parse the request body
      const body = event.body ? JSON.parse(event.body) : {}
      const { name, message, email } = body

      // Validate required fields
      if (!name || !message) {
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            error: 'Missing required fields',
            required: ['name', 'message'],
          }),
        }
      }

      // Save to DynamoDB
      const timestamp = new Date().toISOString()
      const contactId = `${Date.now()}-${Math.random().toString(36).substring(7)}`

      const command = new PutCommand({
        TableName: tableName,
        Item: {
          id: contactId,
          name,
          message,
          email: email || null,
          createdAt: timestamp,
          updatedAt: timestamp,
          __typename: 'Contact',
        },
      })

      await docClient.send(command)

      // Return success response
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: true,
          message: `Thanks for your message, ${name}! We've saved it to our database.`,
          saved: {
            id: contactId,
            name,
            message,
            email,
            timestamp,
          },
        }),
      }
    } catch (error) {
      console.error('Error saving to DynamoDB:', error)
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'Failed to process request',
          details: error instanceof Error ? error.message : 'Unknown error',
        }),
      }
    }
  }

  // Default response for root path
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: 'Welcome to your Amplify REST API! 🚀',
      availableEndpoints: [
        { method: 'GET', path: '/hello', description: 'Get a hello message' },
        { method: 'GET', path: '/contacts', description: 'List all contacts' },
        {
          method: 'POST',
          path: '/contact',
          description: 'Submit contact form',
          body: { name: 'string', message: 'string', email: 'string (optional)' },
        },
      ],
      timestamp: new Date().toISOString(),
    }),
  }
}
