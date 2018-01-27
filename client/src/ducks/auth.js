import { createAction } from 'redux-actions'
import { post } from 'utils/fetch'
import apolloClient from 'utils/apolloClient'
import { LOCAL_STORAGE_JWT_TOKEN } from 'constantes'
import Cookies from 'js-cookie'

const RESET = 'TITLE/auth/RESET'
const ERROR = 'TITLE/auth/ERROR'
const SET_TOKEN = 'TITLE/auth/SET_TOKEN'

const initialState = {
  loading: true,
  token: null,
  error: null,
}

export const reducer = function(state = initialState, action) {
  switch (action.type) {
    case RESET:
      return { ...initialState, loading: false }
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        loading: false,
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}

export const init = () => dispatch => {
  const currentToken = localStorage.getItem(LOCAL_STORAGE_JWT_TOKEN)
  if (currentToken) {
    return post('/api/auth/jwt/verify/', `token=${currentToken}`)
      .then(res => dispatch(setToken(currentToken)))
      .catch(() => dispatch(reset()))
  } else {
    dispatch(reset())
  }
}

export const authenticate = ({ username, password }) => dispatch => {
  dispatch(reset())
  return post(
    '/api/auth/jwt/create/',
    `username=${username}&password=${password}`
  ).then(({ token }) => {
    dispatch(setToken(token))
  })
}

export const setToken = token => {
  localStorage.setItem(LOCAL_STORAGE_JWT_TOKEN, token)
  apolloClient.resetStore()
  return { type: SET_TOKEN, payload: token }
}

export const reset = () => {
  localStorage.removeItem(LOCAL_STORAGE_JWT_TOKEN)
  Cookies.remove('sessionid')
  apolloClient.resetStore()
  return { type: RESET }
}

export const error = createAction(ERROR)

export default reducer
