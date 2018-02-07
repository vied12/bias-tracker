import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import newspaperImg from 'assets/newspaper.jpg'
import Sources from 'components/Sources'

const styles = theme => ({
  root: {},
  hero: {
    minHeight: '30vh',
    backgroundImage: `url(${newspaperImg})`,
    backgroundSize: 'cover',
    paddingTop: '15vh',
    paddingLeft: '5vw',
    '& h2': {
      fontSize: '4rem',
      color: 'white',
    },
  },
})

class Source extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.hero}>
          <Typography variant="title">Our sources</Typography>
        </div>
        <Sources />
      </div>
    )
  }
}

export default compose(withStyles(styles))(Source)
