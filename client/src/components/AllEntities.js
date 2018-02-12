import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Divider from 'material-ui/Divider'
import Entity from 'components/Entity'
import Loader from 'components/Loader'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
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
          <div key={node.id}>
            <Entity node={node} />
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
      mostCommonEntities(first: 6) {
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
