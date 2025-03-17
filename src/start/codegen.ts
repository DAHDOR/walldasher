import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      'https://api.start.gg/gql/alpha': {
        headers: {
          Authorization: 'Bearer a1f9a2bf90a62e3931df098c02ad7126'
        }
      }
    }
  ],
  documents: ['./src/**/*.ts'],
  ignoreNoDocuments: true,
  generates: {
    './src/start/graphql/': {
      preset: 'client',
      config: {
        documentMode: 'string'
      }
    },
    './src/start/graphql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true
      }
    }
  },
  hooks: { afterOneFileWrite: ['eslint --fix'] },
  watch: true
}

export default config
