import { createAction } from 'redux-actions'

export const OPEN_ABOUT_US = 'BiasTracker/dialog/OPEN_ABOUT_US'
export const OPEN_FB_VIEWER = 'BiasTracker/dialog/OPEN_FB_VIEWER'
const CLOSE = 'BiasTracker/dialog/CLOSE'

const initialState = {
  dialog: null,
  props: {},
}

export const reducer = function(state = initialState, action) {
  switch (action.type) {
    case OPEN_ABOUT_US:
    case OPEN_FB_VIEWER:
      return { ...initialState, dialog: action.type, props: action.payload }
    case CLOSE:
      return { ...initialState }
    default:
      return state
  }
}

export const close = createAction(CLOSE)
export const openAboutUs = createAction(OPEN_ABOUT_US)
export const openFBViewer = createAction(OPEN_FB_VIEWER)

export default reducer
