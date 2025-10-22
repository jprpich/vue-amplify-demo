import { defineFunction } from '@aws-amplify/backend'

export const myFunction = defineFunction({
  name: 'my-function',
  entry: './handler.ts',
})
