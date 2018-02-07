import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines'
import SparklineRef from 'components/SparklineRef'

const styles = theme => ({
  root: {},
})

const EntityDetails = ({
  theme,
  classes,
  data: { loading, allTexts },
  entity,
  source,
}) => {
  if (loading || !allTexts) {
    return null
  }
  const data = allTexts.edges.map(({ node }) => node.sentimentreport.compound)
  return (
    <div className={classes.root}>
      <Sparklines data={data} min={-1} max={1}>
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
    query getAllTextsForEntityDetails($entity: [ID], $source: ID!) {
      allTexts(entities: $entity, source: $source) {
        edges {
          node {
            id
            sentimentreport {
              id
              compound
            }
          }
        }
      }
    }
  `)
)(EntityDetails)
