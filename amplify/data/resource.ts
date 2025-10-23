import { type ClientSchema, a, defineData } from '@aws-amplify/backend'

const schema = a.schema({
  Contact: a
    .model({
      name: a.string().required(),
      message: a.string().required(),
      email: a.string(),
      createdAt: a.datetime(),
    })
    .authorization((allow) => [allow.publicApiKey()]),
})

export type Schema = ClientSchema<typeof schema>

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
})
