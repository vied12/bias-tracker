import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'
import { withDarkTheme } from 'theme'
import compose from 'recompose/compose'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    minHeight: 150,
    padding: '5vw',
    paddingBottom: '10vw',
    display: 'flex',
    alignItems: 'flex-start',
  },
  siteMap: {
    paddingRight: 40,
    '& > *': {
      display: 'block',
    },
  },
})

function Footer(props) {
  const { classes } = props
  return (
    <div className={classes.root}>
      <Button component={Link} to="/">
        <Typography variant="title">Bias Tracker</Typography>
      </Button>
      <div className={classes.siteMap}>
        <Button component={Link} to="/about">
          About the project
        </Button>
      </div>
      <div className={classes.siteMap}>
        <Typography variant="subheading" style={{ padding: '8px 16px' }}>
          Credits
        </Typography>
        <Button component={Link} to="/about">
          Link 2
        </Button>
        <Button component={Link} to="/about">
          Link 3
        </Button>
        <Button component={Link} to="/about">
          Link 4
        </Button>
      </div>
    </div>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(withDarkTheme, withStyles(styles))(Footer)
