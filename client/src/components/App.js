import React, { Component } from 'react'
import Home from './Home'
import Layout from './Layout'
import history from 'utils/history'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import { Router, Route, Switch } from 'react-router-dom'
import { mainTheme } from 'theme'
import Reboot from 'material-ui/Reboot'

const theme = createMuiTheme(mainTheme)

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <Reboot />
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </Layout>
        </MuiThemeProvider>
      </Router>
    )
  }
}

export default App
