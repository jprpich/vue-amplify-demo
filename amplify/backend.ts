import { defineBackend } from '@aws-amplify/backend'
import { myFunction } from './functions/my-function/resource'
import { Stack } from 'aws-cdk-lib'
import { LambdaRestApi, Cors } from 'aws-cdk-lib/aws-apigateway'

const backend = defineBackend({
  myFunction,
})

// Create a REST API using CDK
const apiStack = backend.createStack('api-stack')

const myRestApi = new LambdaRestApi(apiStack, 'RestApi', {
  handler: backend.myFunction.resources.lambda,
  restApiName: 'myRestApi',
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS,
    allowMethods: Cors.ALL_METHODS,
  },
})

// Add the API endpoint to outputs
backend.addOutput({
  custom: {
    API: {
      endpoint: myRestApi.url,
    },
  },
})
