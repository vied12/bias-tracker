import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Divider from 'material-ui/Divider'
import Button from 'material-ui/Button'
import EntityChart from 'components/EntityChart'
import Loader from 'components/Loader'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit,
  },
  entity: {
    paddingTop: theme.spacing.unit * 2,
  },
  titleBtn: {
    marginLeft: 0 - theme.spacing.unit * 2,
  },
  entityTitle: {
    position: 'sticky',
    zIndex: 1,
    top: 0,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
})

const Sources = ({ classes, data: { loading, mostCommonEntities } }) => {
  if (loading) {
    return <Loader />
  }
  return (
    <div className={classes.root}>
      {mostCommonEntities.edges
        .filter(({ node }) => node.sources.edges.length >= 3)
        .map(({ node }) => (
          <div key={node.id} className={classes.paper}>
            <div className={classes.entityTitle}>
              <Button
                component={Link}
                to={`/entity/${node.id}`}
                className={classes.titleBtn}
              >
                <Typography variant="title">{node.name}</Typography>
              </Button>
            </div>
            <Grid container spacing={40}>
              {node.sources.edges.map(({ node: sourceNode }) => (
                <Grid key={sourceNode.id} item xs={12} sm={6} md={3}>
                  <div>
                    <Button
                      component={Link}
                      to={`/source/${sourceNode.id}`}
                      className={classes.titleBtn}
                    >
                      <Typography variant="headline">
                        {sourceNode.name}
                      </Typography>
                    </Button>
                    <EntityChart entity={node.id} source={sourceNode.id} />
                  </div>
                </Grid>
              ))}
            </Grid>
            <Divider style={{ marginTop: 40 }} />
          </div>
        ))}
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
