import { defineFunction } from '@aws-amplify/backend'

export const myFunction = defineFunction({
  name: 'my-function',
  entry: './handler.ts',
  environment: {
    CONTACT_TABLE_NAME: '', // Will be set by backend.ts
  },
})
