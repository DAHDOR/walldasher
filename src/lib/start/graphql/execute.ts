import type { TypedDocumentString } from './graphql'

type GraphQLResponse<T> = {
  data?: T
  errors?: string[]
  message?: string
}

export async function execute<TResult, TVariables>(
  key: string,
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await fetch('https://api.start.gg/gql/alpha', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/graphql-response+json',
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  const json = (await response.json()) as GraphQLResponse<TResult>

  if (json.errors) throw new Error(json.errors.join('\n'))

  if (json.message) throw new Error(json.message)

  if (!response.ok) throw new Error('Network response was not ok')

  if (!json.data) throw new Error('No data was returned')

  return json.data
}
