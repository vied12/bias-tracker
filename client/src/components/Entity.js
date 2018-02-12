import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import EntityChart from 'components/EntityChart'
import { Link } from 'react-router-dom'

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
  },
  entity: {
    paddingTop: theme.spacing.unit * 2,
  },
  titleBtn: {
    marginLeft: 0 - theme.spacing.unit * 2,
  },
  entityTitle: {
    position: 'sticky',
    zIndex: 1,
    top: 0,
    textAlign: 'center',
    marginBottom: 20,
    backgroundColor: theme.palette.background.default,
  },
})

const Entity = ({ classes, node }) => {
  return (
    <div key={node.id} className={classes.root}>
      <div className={classes.entityTitle}>
        <Button
          component={Link}
          to={`/entity/${node.id}`}
          className={classes.titleBtn}
        >
          <Typography variant="title">{node.name}</Typography>
        </Button>
      </div>
      <Grid container spacing={40}>
        {node.sources.edges.map(({ node: sourceNode }) => (
          <Grid key={sourceNode.id} item xs={12} sm={6} md={4} lg={3} xl={1}>
            <div>
              <Button
                component={Link}
                to={`/source/${sourceNode.id}`}
                className={classes.titleBtn}
              >
                <Typography variant="headline">{sourceNode.name}</Typography>
              </Button>
              <EntityChart entity={node.id} source={sourceNode.id} />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default compose(withStyles(styles))(Entity)