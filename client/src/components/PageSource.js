import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import newspaperImg from 'assets/newspaper.jpg'
import EntityDetails from 'components/EntityDetails'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { CircularProgress } from 'material-ui/Progress'
import countrynames from 'country-list'

const countries = countrynames()

const styles = theme => ({
  root: {
    // padding: theme.spacing.unit * 3,
  },
  hero: {
    minHeight: '30vh',
    backgroundImage: `url(${newspaperImg})`,
    backgroundSize: 'cover',
    paddingTop: '15vh',
    paddingLeft: '5vw',
    '& h2': {
      fontSize: '4rem',
    },
    '& h2, & p': {
      fontSize: '2rem',
      color: 'white',
    },
  },
  body: {
    padding: theme.spacing.unit * 3,
  },
  entityTitle: {
    paddingTop: theme.spacing.unit * 6,
    padding: theme.spacing.unit * 3,
  },
})

class Source extends Component {
  state = {
    viewPosts: null,
  }
  componentDidUpdate = () => {
    console.log('pouet')
    setTimeout(() => window.FB && window.FB.XFBML.parse(), 2000)
  }
  render() {
    const { classes, data: { loading, source } } = this.props
    const { viewPosts } = this.state
    if (loading) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '40vh' }}>
          <CircularProgress />
        </div>
      )
    }
    return (
      <div className={classes.root}>
        <div className={classes.hero}>
          <Typography variant="title">{source.name}</Typography>
          <Typography>{countries.getName(source.country)}</Typography>
          <Typography>{source.textCount} analysed posts</Typography>
        </div>
        <div className={classes.body}>
          <Grid container spacing={40}>
            {source.mainEntities.edges.map(({ node: entityNode }) => [
              <Grid item xs={12} sm={6} md={3} lg={2} key={entityNode.id}>
                <div>
                  <Typography className={classes.entityTitle} variant="title">
                    {entityNode.name}
                  </Typography>
                  <Typography>{entityNode.count} occurences</Typography>
                  <EntityDetails entity={entityNode.id} source={source.id} />
                  <Button
                    onClick={() => this.setState({ viewPosts: entityNode.id })}
                  >
                    See posts
                  </Button>
                </div>
              </Grid>,
              /** viewPosts === entityNode.id &&
              <Grid item xs={12}>
                <Grid container spacing={40}>
                {entityNode.textSet.edges.map(({ node: textNode }) => (
                  <Grid item md={3}>
                    <div className="fb-post"
                      data-href={`https://www.facebook.com/${source.facebookPageId}/posts/${textNode.facebookId.split('_').slice(-1)}/`}
                      data-width="500" data-show-text="true">
                      <blockquote cite={`https://www.facebook.com/${source.facebookPageId}/posts/${textNode.facebookId.split('_').slice(-1)}/`} className="fb-xfbml-parse-ignore">Posted by <a href="https://www.facebook.com/facebook/">Facebook</a> on&nbsp;<a href="https://www.facebook.com/20531316728/posts/10154009990506729/">Thursday, August 27, 2015</a></blockquote>
                    </div>
                  </Grid>
                ))}
                </Grid>
              </Grid>
              */
            ])}
          </Grid>
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  graphql(
    gql`
      query getSource($source: ID!) {
        source(id: $source) {
          id
          name
          facebookPageId
          mainEntities(first: 50) {
            edges {
              node {
                id
                textSet(first: 5) {
                  edges {
                    node {
                      id
                      facebookId
                    }
                  }
                }
                name
                count
              }
            }
          }
          textCount
          country
          language
        }
      }
    `,
    {
      options: props => ({
        variables: {
          source: props.match.params.source,
        },
      }),
    }
  )
)(Source)
