import React, { Component } from 'react'
import PageHome from 'components/PageHome'
import Layout from 'components/Layout'
import PageSource from 'components/PageSource'
import PageTag from 'components/PageTag'
import ScrollToTop from 'components/ScrollToTop'
import Dialog from 'components/Dialog'
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
        <ScrollToTop>
          <MuiThemeProvider theme={theme}>
            <Reboot />
            <Layout>
              <Switch>
                <Route path="/tag/:tag" component={PageTag} />
                <Route path="/source/:source" component={PageSource} />
                <Route exact path="/" component={PageHome} />
              </Switch>
            </Layout>
            <Dialog />
          </MuiThemeProvider>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
