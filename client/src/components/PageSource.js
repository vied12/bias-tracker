import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Tooltip from 'material-ui/Tooltip'
import newspaperImg from 'assets/newspaper.jpg'
import Chart from 'components/Chart'
import Loader from 'components/Loader'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import countrynames from 'country-list'

const countries = countrynames()

const styles = theme => ({
  root: {},
  hero: {
    minHeight: '30vh',
    backgroundImage: `url(${newspaperImg})`,
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
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
  entity: {
    textAlign: 'center',
    '&:hover $seeMoreBtn': {
      opacity: 1,
    },
  },
  seeMoreBtn: {
    marginTop: theme.spacing.unit * 3,
    opacity: 0,
    transition: 'all .25s',
  },
  entityName: {
    marginTop: theme.spacing.unit * 6,
    margin: theme.spacing.unit * 3,
    display: 'inline-block',
  },
  viewPosts: {
    '& > h2': {
      textAlign: 'center',
      marginBottom: theme.spacing.unit * 3,
    },
  },
})

class Source extends Component {
  render() {
    const { classes, data: { loading, source } } = this.props
    if (loading) {
      return <Loader />
    }
    return (
      <div className={classes.root}>
        <div className={classes.hero}>
          <Typography variant="title">{source.name}</Typography>
          <Typography>{countries.getName(source.country)}</Typography>
        </div>
        <div className={classes.body}>
          <Grid container spacing={40}>
            {source.mainEntities.edges.map(({ node: entityNode }) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                key={entityNode.id}
                className={classes.entity}
              >
                <div>
                  <Tooltip title={entityNode.entityType} placement="top">
                    <div className={classes.entityName}>
                      <Typography variant="title">{entityNode.name}</Typography>
                    </div>
                  </Tooltip>
                  <Chart entity={entityNode.id} source={source.id} />
                </div>
              </Grid>
            ))}
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
          country
          language
          mainEntities(first: 100) {
            edges {
              node {
                id
                name
                entityType
              }
            }
          }
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
