import React, { Component } from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Entity from 'components/Entity'
import SearchInput from 'components/SearchInput'
import Loader from 'components/Loader'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  search: {
    maxWidth: 400,
    margin: `${theme.spacing.unit * 3}px auto`,
  },
})

class Source extends Component {
  render() {
    const { classes, data: { loading, tag } } = this.props
    if (loading) {
      return <Loader />
    }
    return (
      <div className={classes.root}>
        <div className={classes.search}>
          <SearchInput />
        </div>
        <div className={classes.body}>
          <Entity node={tag} />
        </div>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  graphql(
    gql`
      query getEntity($tag: ID!) {
        tag(id: $tag) {
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
    `,
    {
      options: props => ({
        variables: {
          tag: props.match.params.tag,
        },
      }),
    }
  )
)(Source)
