import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Loader from 'components/Loader'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
})

const MostCommonEntiesList = ({
  classes,
  data: { loading, mostCommonEntities, fetchMore },
}) => {
  if (loading) {
    return <Loader />
  }
  return (
    <div className={classes.root}>
      <Typography variant="headline">More entities</Typography>
      {mostCommonEntities.edges.map(({ node }) => (
        <Button
          key={node.id}
          component={Link}
          to={`/entity/${node.id}`}
          className={classes.titleBtn}
        >
          <Typography variant="title">{node.name}</Typography>
        </Button>
      ))}
    </div>
  )
}

export default compose(
  withStyles(styles),
  graphql(gql`
    query {
      mostCommonEntities(first: 200) {
        edges {
          node {
            id
            name
            entityType
          }
        }
      }
    }
  `)
)(MostCommonEntiesList)
