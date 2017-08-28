import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import * as EV from './api/base'
import api from './api'

import rootReducer from './reducer/root'

const Store = applyMiddleware()(createStore)(rootReducer)

export default Store
