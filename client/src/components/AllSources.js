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
  tag: {
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
            {node.mainTags.edges.map(({ node: tagNode }) => (
              <div key={tagNode.id}>
                <Typography variant="title" className={classes.tag}>
                  {tagNode.name}
                </Typography>
                <Chart tag={tagNode.id} source={node.id} />
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
      allSources(country: "IT") {
        edges {
          node {
            id
            name
            country
            language
            url
            mainTags(first: 8) {
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
