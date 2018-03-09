import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Chart from 'components/Chart'
import { Link } from 'react-router-dom'
import Slider from 'components/Slider'

const styles = theme => ({
  titleBtn: {
    padding: 0,
  },
  entityTitle: {
    marginBottom: 20,
  },
})

const renderSources = ({ classes, sources, node }) => {
  return node.sources.edges.map(({ node: sourceNode }) => (
    <div key={sourceNode.id}>
      <div>
        <Button
          component={Link}
          to={`/source/${sourceNode.id}`}
          className={classes.titleBtn}
        >
          <Typography variant="headline">{sourceNode.name}</Typography>
        </Button>
        <Chart tag={node.id} source={sourceNode.id} />
      </div>
    </div>
  ))
}

const Tagging = ({ classes, node, withSlider }) => {
  return (
    <div key={node.id} className={classes.root}>
      <div className={classes.entityTitle}>
        <Button
          component={Link}
          to={`/tag/${node.id}`}
          className={classes.titleBtn}
        >
          <Typography variant="title">{node.name}</Typography>
        </Button>
      </div>
      {node.sources.edges.length === 0 && (
        <Typography variant="display1" style={{ fontSize: '1.5rem' }}>
          There are not enough data to be relevant
        </Typography>
      )}
      {withSlider ? (
        <Slider>{renderSources({ node, classes })}</Slider>
      ) : (
        <Grid container spacing={40}>
          {renderSources({ node, classes }).map((child, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={1} key={i}>
              {child}
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}

export default compose(withStyles(styles))(Tagging)
