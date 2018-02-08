import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'
import SparklineRef from 'components/SparklineRef'

const styles = theme => ({
  root: {
    minHeight: 60,
  },
})

const EntityDetails = ({
  theme,
  classes,
  data: { loading, allSentiments = { edges: [] } },
  entity,
  source,
}) => {
  const data = allSentiments.edges.map(({ node }) => node.compound)
  return (
    <div className={classes.root}>
      <Sparklines data={data} height={60} min={-1} max={1}>
        <SparklineRef />
        <SparklinesLine color={theme.palette.primary[900]} />
        <SparklinesSpots />
      </Sparklines>
    </div>
  )
}

export default compose(
  withStyles(styles, { withTheme: true }),
  graphql(gql`
    query getReportsForEntityDetails($entity: [ID], $source: ID!) {
      allSentiments(text_Source: $source, text_Entities: $entity) {
        edges {
          node {
            id
            compound
          }
        }
      }
    }
  `)
)(EntityDetails)
