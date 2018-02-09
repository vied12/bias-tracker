import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import newspaperImg from 'assets/newspaper.jpg'
import AllSources from 'components/AllSources'
import { withDarkTheme } from 'theme'

const styles = theme => ({
  root: {},
  hero: {
    // minHeight: '15vh',
    backgroundImage: `url(${newspaperImg})`,
    backgroundSize: 'cover',
    paddingTop: '5vh',
    paddingBottom: '4vh',
    paddingLeft: '5vw',
    '& h2': {
      fontSize: '4rem',
    },
    boxShadow: '0 0 200px black inset',
  },
  intro: {
    backgroundColor: theme.palette.primary[50],
    padding: theme.spacing.unit * 3,
    '& > *': {
      maxWidth: 600,
      fontSize: '1.2rem',
      margin: `${theme.spacing.unit * 12}px auto`,
    },
  },
})

class Source extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.intro}>
          <Typography variant="body2">
            Monitor the sentiments expressed in news media posts on social media
            on selected topics over time Click on a news organization to see its
            topics. The charts illustrate the strength of the sentiment
            expressed in the post - the higher or lower the points in the chart,
            the more strongly positive or negative the sentiment.
          </Typography>
        </div>
        <Divider />
        {withDarkTheme(() => (
          <div className={classes.hero}>
            <Typography variant="title">Our sources</Typography>
            <Typography style={{ fontSize: '1rem', fontWeight: '700' }}>
              And their top 5 concerns
            </Typography>
          </div>
        ))()}
        <AllSources />
      </div>
    )
  }
}

export default compose(withStyles(styles))(Source)
