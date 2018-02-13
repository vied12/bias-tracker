import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Slider from 'components/Slider'
import Chart from 'components/Chart'
import { Link } from 'react-router-dom'
import Loader from 'components/Loader'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 6,
  },
  row: {
    marginBottom: theme.spacing.unit * 3,
  },
  entity: {
    fontSize: '1rem',
  },
  sourceTitle: {
    marginBottom: theme.spacing.unit * 3,
    padding: 0,
    '& h1': {
      fontSize: '2rem',
    },
  },
})

const Sources = ({ classes, data: { loading, allSources } }) => {
  if (loading) {
    return <Loader />
  }
  return (
    <div className={classes.root}>
      {allSources.edges.map(({ node }) => (
        <div key={node.id} className={classes.row}>
          <Button
            component={Link}
            to={`/source/${node.id}`}
            className={classes.sourceTitle}
          >
            <Typography variant="headline">{node.name}</Typography>
          </Button>
          <Slider>
            {node.mainEntities.edges.map(({ node: entityNode }) => (
              <div key={entityNode.id}>
                <Typography variant="title" className={classes.entity}>
                  {entityNode.name}
                </Typography>
                <Chart entity={entityNode.id} source={node.id} />
              </div>
            ))}
          </Slider>
        </div>
      ))}
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
            mainEntities(first: 8) {
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
