import React from 'react'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import * as dialogActions from 'ducks/dialog'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
} from 'material-ui/Dialog'

const styles = theme => ({
  paragraph: {
    fontSize: '1rem',
    marginBottom: '1rem',
  },
})

const AboutUsDialog = ({ classes, dialog, close }) => {
  return (
    <Dialog open={dialog} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">About the project</DialogTitle>
      <DialogContent>
        <Typography className={classes.paragraph}>
          What kinds of words are used in social media when talking about the
          news? Do they change over time? The Bias Tracker project is an attempt
          to use machine learning to automatically analyze sentiment over time,
          as expressed in various social media feeds in the runup to the Italian
          election.
        </Typography>
        <Typography className={classes.paragraph}>
          Each feed’s posts are then analyzed with the topics extracted and the
          sentiment words evaluated. This gives us a picture of the sentiment
          toward a topic. Then we track these topics over time, to see how they
          develop - does a mainstream media organization change its tone? Does
          the Five Star Movement change its language?
        </Typography>
        <Typography className={classes.paragraph}>
          The project is a collaboration between Agipress, the University of
          Urbino and software developers Edouard Richard and Douglas Arellanes.
        </Typography>
        <Typography className={classes.paragraph}>
          This project has been funded by a grant from TechCamp and is possible
          thank to US Embassy in Rome support
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default compose(
  withStyles(styles),
  connect(
    state => ({
      dialog: !!state.dialog.dialog,
    }),
    dispatch => ({
      close: () => dispatch(dialogActions.close()),
    })
  )
)(AboutUsDialog)
