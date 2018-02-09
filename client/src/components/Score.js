import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import red from 'material-ui/colors/red'
import green from 'material-ui/colors/green'
import SentimentDissatisfied from 'material-ui-icons/SentimentDissatisfied'
import SentimentSatisfied from 'material-ui-icons/SentimentSatisfied'
import SentimentNeutral from 'material-ui-icons/SentimentNeutral'
import Tooltip from 'material-ui/Tooltip'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  green: {
    color: green[500],
  },
  red: {
    color: red[500],
  },
})

const getSmiley = value => {
  if (value > 0.5) {
    return <SentimentSatisfied />
  } else if (value > -0.5) {
    return <SentimentNeutral />
  } else return <SentimentDissatisfied />
}

const Score = ({ value, classes, withNumber, ...other }) => {
  return (
    <div className={value >= 0 ? classes.green : classes.red} {...other}>
      {withNumber && (
        <Typography className={value >= 0 ? classes.green : classes.red}>
          {value.toFixed(2)}
        </Typography>
      )}
      <Tooltip title={value.toFixed(2)}>{getSmiley(value)}</Tooltip>
    </div>
  )
}

export default compose(withStyles(styles))(Score)
