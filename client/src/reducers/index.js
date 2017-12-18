import { combineReducers } from 'redux'
import auth from 'ducks/auth'

const rootReducer = combineReducers({
  auth,
})

export default rootReducer
