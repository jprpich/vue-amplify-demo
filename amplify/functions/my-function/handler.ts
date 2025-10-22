import type { APIGatewayProxyHandler } from 'aws-lambda'

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log('Event:', event)

  // Handle different paths
  const path = event.path
  const method = event.httpMethod

  // Simple routing
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

  // Default response for root path
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      message: 'Welcome to your Amplify REST API! 🚀',
      availableEndpoints: ['/hello'],
      timestamp: new Date().toISOString(),
    }),
  }
}
