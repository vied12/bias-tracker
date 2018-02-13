import React from 'react'
import compose from 'recompose/compose'
import MuiDialog from 'material-ui/Dialog'
import { connect } from 'react-redux'
import * as dialogActions from 'ducks/dialog'
import FBPostsViewer from 'components/FBPostsViewer'
import AboutUsDialog from 'components/AboutUsDialog'

const MODALS = {
  [dialogActions.OPEN_FB_VIEWER]: FBPostsViewer,
  [dialogActions.OPEN_ABOUT_US]: AboutUsDialog,
}
const Dialog = ({ dialog, dialogProps, close, children }) => {
  if (!dialog) {
    return null
  }
  const Comp = MODALS[dialog]
  return (
    <MuiDialog open={!!dialog} onClose={close} maxWidth="md" fullWidth>
      <Comp {...dialogProps} />
    </MuiDialog>
  )
}
export default compose(
  connect(
    state => ({
      dialog: state.dialog.dialog,
      dialogProps: state.dialog.props,
    }),
    dispatch => ({
      close: () => dispatch(dialogActions.close()),
    })
  )
)(Dialog)
