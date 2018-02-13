import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import AllSources from 'components/AllSources'
import Highlights from 'components/Highlights'
import SearchInput from 'components/SearchInput'
import Hero from 'components/Hero'

const styles = theme => ({
  root: {},
  intro: {
    paddingTop: theme.spacing.unit * 6,
    padding: theme.spacing.unit * 3,
    '& aside': {
      fontSize: '1.2rem',
      marginBottom: theme.spacing.unit * 3,
    },
  },
  right: {
    paddingTop: theme.spacing.unit * 6,
    paddingLeft: theme.spacing.unit * 6,
    paddingRight: theme.spacing.unit * 6,
  },
  fristPart: {
    backgroundColor: theme.palette.primary[50],
  },
})

class Source extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <Grid container className={classes.fristPart}>
          <Grid item xs={12} md={3} lg={2}>
            <div className={classes.intro}>
              <Typography variant="body2">
                Monitor the sentiments expressed in news media posts on social
                media on selected topics over time.
              </Typography>
              <Typography variant="body2">
                Click on a news organization to see its topics. The charts
                illustrate the strength of the sentiment expressed in the post -
                the higher or lower the points in the chart, the more strongly
                positive or negative the sentiment.
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={9} lg={10}>
            <div className={classes.right}>
              <SearchInput />
              <Highlights />
            </div>
          </Grid>
        </Grid>
        <div>
          <Hero title="Our sources" description="And their top concerns" />
          <AllSources />
        </div>
      </div>
    )
  }
}

export default compose(withStyles(styles))(Source)
