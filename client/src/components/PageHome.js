import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import MostCommonEntiesList from 'components/MostCommonEntiesList'
import AllSources from 'components/AllSources'
import AllEntities from 'components/AllEntities'
import Hero from 'components/Hero'
import reporterImg from 'assets/reporter.jpg'
import { HashLink as Link } from 'react-router-hash-link'
import SearchInput from 'components/SearchInput'

const styles = theme => ({
  root: {},
  intro: {
    backgroundColor: theme.palette.primary[50],
    padding: theme.spacing.unit * 3,
    '& aside': {
      fontSize: '1.2rem',
      marginBottom: theme.spacing.unit * 3,
    },
    '& > *': {
      maxWidth: 600,
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
          <div>
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
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="title">Explore our data</Typography>
                <Button
                  component={Link}
                  to="#our-sources"
                  variant="raised"
                  size="large"
                  color="primary"
                >
                  Sources
                </Button>
                <Button
                  component={Link}
                  to="#the-entities"
                  variant="raised"
                  size="large"
                  color="primary"
                >
                  Entities
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="title">
                  Looking for something more specific ?
                </Typography>
                <SearchInput />
              </Grid>
            </Grid>
          </div>
        </div>
        <Divider />
        <Hero title="Our sources" description="And their top 3 concerns" />
        <AllSources />
        <Hero
          title="The Entities"
          description="And how they are covered by the Media"
          image={reporterImg}
        />
        <AllEntities />
        <MostCommonEntiesList />
      </div>
    )
  }
}

export default compose(withStyles(styles))(Source)
