import { defineBackend } from '@aws-amplify/backend'
import { myFunction } from './functions/my-function/resource'
import { data } from './data/resource'
import { Stack } from 'aws-cdk-lib'
import { LambdaRestApi, Cors } from 'aws-cdk-lib/aws-apigateway'

const backend = defineBackend({
  myFunction,
  data,
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

// Set the table name environment variable for the Lambda function
const contactTable = backend.data.resources.tables['Contact']
backend.myFunction.addEnvironment('CONTACT_TABLE_NAME', contactTable.tableName)

// Grant the Lambda function access to the DynamoDB table
contactTable.grantReadWriteData(backend.myFunction.resources.lambda)

// Add the API endpoint to outputs
backend.addOutput({
  custom: {
    API: {
      endpoint: myRestApi.url,
    },
  },
})
