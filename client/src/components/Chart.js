import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ResponsiveContainer, BarChart, Bar, Cell } from 'recharts'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'
import { mean } from 'lodash'
import Score from 'components/Score'
import { connect } from 'react-redux'
import * as dialogActions from 'ducks/dialog'

const styles = theme => ({
  root: {
    minHeight: 60,
    width: '100%',
    textAlign: 'center',
  },
})

const Chart = ({
  openViewer,
  theme,
  classes,
  entity,
  source,
  data: { loading, allSentiments = { edges: [] } },
}) => {
  const data = allSentiments.edges.map(({ node }) => ({ val: node.compound }))
  return (
    <div
      className={classes.root}
      onClick={() => openViewer({ entity, source })}
    >
      <ResponsiveContainer height={60}>
        <BarChart data={data} stackOffset="sign">
          <Bar isAnimationActive={false} type="monotone" dataKey="val">
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.val > 0 ? green[500] : red[500]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {data.length > 0 && <Score value={mean(data.map(d => d.val))} />}
    </div>
  )
}

export default compose(
  withStyles(styles, { withTheme: true }),
  graphql(gql`
    query getReportsForChart($entity: [ID], $tag: [ID], $source: ID!) {
      allSentiments(
        text_Source: $source
        text_Entities: $entity
        text_Tags: $tag
      ) {
        edges {
          node {
            id
            compound
          }
        }
      }
    }
  `),
  connect(
    () => ({}),
    dispatch => ({
      openViewer: d => dispatch(dialogActions.openFBViewer(d)),
    })
  )
)(Chart)
