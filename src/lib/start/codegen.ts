import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: [
    {
      'https://api.start.gg/gql/alpha': {
        headers: {
          Authorization: 'Bearer bb44d00b08e43d06cf6d4cb891773ae6'
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
