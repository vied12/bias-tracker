import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import { withDarkTheme } from 'theme'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import * as dialogActions from 'ducks/dialog'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    minHeight: 150,
    padding: '5vw',
    marginTop: theme.spacing.unit * 6,
    paddingBottom: '10vw',
    display: 'flex',
    alignItems: 'flex-start',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  siteMap: {
    paddingRight: 40,
    '& > *': {
      display: 'block',
    },
  },
})

function Footer(props) {
  const { classes, openAboutUs } = props
  return (
    <div className={classes.root}>
      <Button component={Link} to="/">
        <Typography variant="title">Bias Tracker</Typography>
      </Button>
      <div className={classes.siteMap}>
        <Button onClick={openAboutUs}>Che cosa è</Button>
      </div>
      <div className={classes.siteMap}>
        <Typography variant="subheading" style={{ padding: '8px 16px' }}>
          Credits
        </Typography>
        <Button href="http://ifg.uniurb.it/">
          Istituto per la formazione al giornalismo di Urbino
        </Button>
        <Button href="https://elezioni2018.news/">
          Elezioni 2018: Mapping Italian News
        </Button>
      </div>
    </div>
  )
}

Footer.propTypes = {
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
)(Footer)
