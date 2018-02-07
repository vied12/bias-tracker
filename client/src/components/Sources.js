import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Paper from 'material-ui/Paper'
import countrynames from 'country-list'
import EntityDetails from 'components/EntityDetails'
import { Link } from 'react-router-dom'

const countries = countrynames()

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },
  entity: {},
  sourceTitle: {
    marginLeft: 0 - theme.spacing.unit * 2,
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
          <Grid key={node.id} item xs={12} sm={6} md={3} lg={2}>
            <Paper className={classes.paper}>
              <Button
                component={Link}
                to={`/source/${node.id}`}
                className={classes.sourceTitle}
              >
                <Typography variant="headline">{node.name}</Typography>
              </Button>
              <Typography variant="subheading">
                {countries.getName(node.country)}
              </Typography>
              <Typography variant="caption">{node.textCount} posts</Typography>
              {node.mainEntities.edges.map(({ node: entityNode }) => (
                <div key={entityNode.id}>
                  <Typography className={classes.entity}>
                    {entityNode.name}
                  </Typography>
                  <EntityDetails entity={entityNode.id} source={node.id} />
                </div>
              ))}
            </Paper>
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
            textCount
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
