import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import newspaperImg from 'assets/newspaper.jpg'
import Sources from 'components/Sources'

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit * 3,
  },
  hero: {
    minHeight: '30vh',
    backgroundImage: `url(${newspaperImg})`,
    backgroundSize: 'cover',
    paddingTop: '15vh',
    paddingLeft: theme.spacing.unit * 10,
    '& h2': {
      fontSize: '4rem',
      color: 'white',
    },
  },
})

class Login extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.hero}>
          <Typography variant="title">Our sources</Typography>
        </div>
        <Sources />
        <Grid container />
      </div>
    )
  }
}

export default compose(withStyles(styles))(Login)
