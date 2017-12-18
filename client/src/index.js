import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './store'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import apolloClient from 'utils/apolloClient'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
