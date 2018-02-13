import React from 'react'
import compose from 'recompose/compose'
import MuiDialog, { withMobileDialog } from 'material-ui/Dialog'
import { connect } from 'react-redux'
import * as dialogActions from 'ducks/dialog'
import FBPostsViewer from 'components/FBPostsViewer'
import AboutUsDialog from 'components/AboutUsDialog'

const MODALS = {
  [dialogActions.OPEN_FB_VIEWER]: FBPostsViewer,
  [dialogActions.OPEN_ABOUT_US]: AboutUsDialog,
}
const Dialog = ({ dialog, dialogProps, close, children, fullScreen }) => {
  if (!dialog) {
    return null
  }
  const Comp = MODALS[dialog]
  return (
    <MuiDialog
      open={!!dialog}
      fullScreen={fullScreen}
      onClose={close}
      maxWidth="md"
      fullWidth
    >
      <Comp {...dialogProps} close={close} />
    </MuiDialog>
  )
}
export default compose(
  withMobileDialog(),
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
