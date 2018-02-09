import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import countrynames from 'country-list'
import EntityChart from 'components/EntityChart'
import { Link } from 'react-router-dom'

const countries = countrynames()

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },
  entity: {
    paddingTop: theme.spacing.unit * 2,
    fontSize: '1rem',
  },
  sourceTitle: {
    marginLeft: 0 - theme.spacing.unit * 2,
    '& h1': {
      fontSize: '2rem',
    },
  },
})

const Sources = ({ classes, data: { loading, allSources } }) => {
  if (loading) {
    return null
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={40}>
        {allSources.edges.map(({ node }) => (
          <Grid key={node.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <div className={classes.paper}>
              <Button
                component={Link}
                to={`/source/${node.id}`}
                className={classes.sourceTitle}
              >
                <Typography variant="headline">{node.name}</Typography>
              </Button>
              <Typography variant="caption">
                {countries.getName(node.country)}
              </Typography>
              {node.mainEntities.edges.map(({ node: entityNode }) => (
                <div key={entityNode.id}>
                  <Typography variant="title" className={classes.entity}>
                    {entityNode.name}
                  </Typography>
                  <EntityChart entity={entityNode.id} source={node.id} />
                </div>
              ))}
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default compose(
  withStyles(styles),
  graphql(gql`
    query {
      allSources {
        edges {
          node {
            id
            name
            country
            language
            url
            mainEntities(first: 5) {
              edges {
                node {
                  id
                  name
                }
              }
            }
          }
        }
      }
    }
  `)
)(Sources)
