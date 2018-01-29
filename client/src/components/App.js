import React, { Component } from 'react'
import Login from './Login'
import Layout from './Layout'
import history from 'utils/history'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Router, Route, Switch } from 'react-router-dom'
import { mainTheme } from 'theme'

const theme = createMuiTheme(mainTheme)

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <Layout>
            <Switch />
          </Layout>
        </MuiThemeProvider>
      </Router>
    )
  }
}

// <Route exact path="/" component={Login} />
// <Route component={Login} />
export default App
