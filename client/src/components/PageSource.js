import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import newspaperImg from 'assets/newspaper.jpg'
import EntityDetails from 'components/EntityDetails'
import FBPostsViewer from 'components/FBPostsViewer'
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
    setTimeout(() => window.FB && window.FB.XFBML.parse(), 2000)
  }
  render() {
    const { classes, data: { loading, source } } = this.props
    const { viewPosts } = this.state
    if (loading) {
      return (
        <div
          style={{
            textAlign: 'center',
            paddingTop: '40vh',
            paddingBottom: '10vh',
          }}
        >
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
                  <Typography>{entityNode.entityType}</Typography>
                  <Typography>{entityNode.count} occurences</Typography>
                  <EntityDetails entity={entityNode.id} source={source.id} />
                  <Button
                    onClick={() => this.setState({ viewPosts: entityNode.id })}
                  >
                    See posts
                  </Button>
                </div>
              </Grid>,
              viewPosts === entityNode.id && (
                <Grid item xs={12} key="2">
                  <FBPostsViewer
                    source={source.id}
                    entity={entityNode.id}
                    onCloseRequest={() => this.setState({ viewPosts: null })}
                  />
                </Grid>
              ),
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
                name
                entityType
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
