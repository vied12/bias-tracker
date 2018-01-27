import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fragmentMatcher from 'utils/fragmentMatcher'
import { ApolloLink } from 'apollo-link'
import { LOCAL_STORAGE_JWT_TOKEN } from 'constantes'
import { BatchHttpLink } from 'apollo-link-batch-http'

const httpLink = new BatchHttpLink({ uri: '/graphql-batch/' })
const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN)
  operation.setContext({
    headers: {
      authorization: token ? 'JWT ' + token : null,
    },
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache({ fragmentMatcher }),
})

export default client
