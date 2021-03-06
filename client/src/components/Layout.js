import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router'
import classNames from 'classnames'
import Header from 'components/Header'
import Footer from 'components/Footer'

const styles = theme => ({})

const Layout = ({ classes, children }) => {
  return (
    <div className={classNames(classes.root)}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default compose(
  // allow to reload the component when the route change
  withRouter,
  withStyles(styles, { withTheme: true })
)(Layout)
