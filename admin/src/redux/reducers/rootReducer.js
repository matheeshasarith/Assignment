// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'

import {
  eventListReducer
} from './events/eventReducers'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  eventList: eventListReducer

})

export default rootReducer
