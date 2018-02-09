import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import InfoIcon from 'material-ui-icons/Info'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import { withDarkTheme } from 'theme'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import * as dialogActions from 'ducks/dialog'

const styles = {
  root: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}

function ButtonAppBar(props) {
  const { classes, openAboutUs } = props
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div style={{ flex: 1 }}>
            <Button component={Link} to="/">
              <Typography variant="title" className={classes.flex}>
                Bias Tracker
              </Typography>
            </Button>
          </div>
          <IconButton onClick={openAboutUs}>
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withDarkTheme,
  withStyles(styles),
  connect(
    () => ({}),
    dispatch => ({
      openAboutUs: () => dispatch(dialogActions.openAboutUs()),
    })
  )
)(ButtonAppBar)
