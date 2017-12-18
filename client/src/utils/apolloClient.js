import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fragmentMatcher from 'utils/fragmentMatcher'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'

const httpLink = createHttpLink({ uri: '/graphql/' })
const middlewareLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: 'JWT ' + localStorage.getItem('token') || null,
      // authorization: store.getState().auth.token || null
    },
  })
  return forward(operation)
})

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  // link: new BatchHttpLink({ uri: 'http://localhost:8000/pouet/' }),
  cache: new InMemoryCache({ fragmentMatcher }).restore({}),
})

export default client
