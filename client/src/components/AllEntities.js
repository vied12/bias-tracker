import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import EntityChart from 'components/EntityChart'
import Loader from 'components/Loader'
import { Link } from 'react-router-dom'

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
  },
})

const Sources = ({ classes, data: { loading, mostCommonEntities } }) => {
  if (loading) {
    return <Loader />
  }
  return (
    <div className={classes.root}>
      <Grid container spacing={40}>
        {mostCommonEntities.edges
          .filter(({ node }) => node.sources.edges.length >= 3)
          .map(({ node }) => (
            <Grid key={node.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <div className={classes.paper}>
                <Button
                  component={Link}
                  to={`/entity/${node.id}`}
                  className={classes.sourceTitle}
                >
                  <Typography variant="title">{node.name}</Typography>
                </Button>
                {node.sources.edges.map(({ node: sourceNode }) => (
                  <div key={sourceNode.id}>
                    <Button
                      component={Link}
                      to={`/source/${sourceNode.id}`}
                      className={classes.sourceTitle}
                    >
                      <Typography variant="headline">
                        {sourceNode.name}
                      </Typography>
                    </Button>
                    <EntityChart entity={node.id} source={sourceNode.id} />
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
      mostCommonEntities(first: 12) {
        edges {
          node {
            id
            name
            entityType
            sources {
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
