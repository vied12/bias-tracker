import React from 'react'
import compose from 'recompose/compose'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import red from 'material-ui/colors/red'
import green from 'material-ui/colors/green'

const styles = theme => ({
  green: {
    color: green[500],
  },
  red: {
    color: red[500],
  },
})

const Score = ({ value, classes }) => {
  return (
    <Typography
      component="span"
      className={value >= 0 ? classes.green : classes.red}
    >
      {value.toFixed(2)}
    </Typography>
  )
}

export default compose(withStyles(styles))(Score)
