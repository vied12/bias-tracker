import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'

const styles = theme => ({
  root: {
    minHeight: 60,
    width: '100%',
  },
})

const EntityDetails = ({
  theme,
  classes,
  data: { loading, allSentiments = { edges: [] } },
  entity,
  source,
}) => {
  const data = allSentiments.edges.map(({ node }) => ({ val: node.compound }))
  return (
    <div className={classes.root}>
      <ResponsiveContainer height={60}>
        <BarChart data={data} stackOffset="sign">
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="green" stopOpacity={1} />
              <stop offset="50%" stopColor="red" stopOpacity={1} />
            </linearGradient>
          </defs>
          <Bar isAnimationActive={false} type="monotone" dataKey="val">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.val > 0 ? 'green' : 'red'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
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
