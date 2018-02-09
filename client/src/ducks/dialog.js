import { createAction } from 'redux-actions'

const OPEN_ABOUT_US = 'BiasTracker/dialog/OPEN_ABOUT_US'
const CLOSE = 'BiasTracker/dialog/CLOSE'

const initialState = {
  dialog: null,
}

export const reducer = function(state = initialState, action) {
  switch (action.type) {
    case OPEN_ABOUT_US:
      return { ...initialState, dialog: OPEN_ABOUT_US }
    case CLOSE:
      return { ...initialState, dialog: null }
    default:
      return state
  }
}

export const close = createAction(CLOSE)
export const openAboutUs = createAction(OPEN_ABOUT_US)

export default reducer
