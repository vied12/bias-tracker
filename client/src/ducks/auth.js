import { createAction } from 'redux-actions'
import { post } from 'utils/fetch'
import apolloClient from 'utils/apolloClient'
const RESET = 'TITLE/map/RESET'
const ERROR = 'TITLE/map/ERROR'
const SET_TOKEN = 'TITLE/map/SET_TOKEN'

const initialState = {
  currentUser: null,
  token: null,
  error: null,
}

export const reducer = function(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return { ...initialState }
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}

export const authenticate = ({ username, password }) => dispatch => {
  dispatch(reset())
  post('/auth/jwt/create/', `username=${username}&password=${password}`).then(
    ({ token }) => {
      dispatch(setToken(token))
    }
  )
}

// export const fetchCurrentUser = () => (dispatch, getState) => {
//   dispatch({ type: 'FETCH_CURRENT_USER' })
//   fetchJson('auth/me/')
//   .then(d => console.log(d))
// }
export const setToken = token => {
  localStorage.setItem('token', token)
  apolloClient.resetStore()
  return { type: SET_TOKEN, payload: token }
}

export const reset = () => {
  localStorage.removeItem('token')
  apolloClient.resetStore()
  return { type: RESET }
}

export const error = createAction(ERROR)

export default reducer
