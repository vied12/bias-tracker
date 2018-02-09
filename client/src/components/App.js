import React, { Component } from 'react'
import Home from 'components/PageHome'
import Layout from 'components/Layout'
import Source from 'components/PageSource'
import ScrollToTop from 'components/ScrollToTop'
import AboutUsDialog from 'components/AboutUsDialog'
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
                <Route path="/source/:source" component={Source} />
                <Route exact path="/" component={Home} />
              </Switch>
            </Layout>
            <AboutUsDialog />
          </MuiThemeProvider>
        </ScrollToTop>
      </Router>
    )
  }
}

export default App
