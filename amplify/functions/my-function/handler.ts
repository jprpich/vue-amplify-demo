import type { APIGatewayProxyHandler } from 'aws-lambda'

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

  // POST /contact
  if (method === 'POST' && path === '/contact') {
    try {
      // Parse the request body
      const body = event.body ? JSON.parse(event.body) : {}
      const { name, message } = body

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

      // Here you could save to database, send email, etc.
      // For now, we'll just return a confirmation
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          success: true,
          message: `Thanks for your message, ${name}!`,
          received: {
            name,
            message,
            timestamp: new Date().toISOString(),
          },
        }),
      }
    } catch (error) {
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
        {
          method: 'POST',
          path: '/contact',
          description: 'Submit contact form',
          body: { name: 'string', message: 'string' },
        },
      ],
      timestamp: new Date().toISOString(),
    }),
  }
}
