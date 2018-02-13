import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Loader from 'components/Loader'
import Entity from 'components/Entity'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
  row: {
    marginBottom: theme.spacing.unit * 3,
  },
})
const Highlights = ({
  classes,
  entitiesData: { loading: entitiesLoading, highlightedEntites },
}) => {
  if (entitiesLoading) {
    return <Loader />
  }
  return (
    <div className={classes.root}>
      {[...highlightedEntites.edges].map(({ node }) => (
        <div className={classes.row} key={node.id}>
          <Entity node={node} withSlider />
        </div>
      ))}
    </div>
  )
}

const query = `
edges {
  node {
    id
    name
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
`

export default compose(
  withStyles(styles),
  graphql(
    gql`
    query HighlightedEntites {
      highlightedEntites {
        ${query}
      }
    }
  `,
    {
      name: 'entitiesData',
    }
  )
)(Highlights)
