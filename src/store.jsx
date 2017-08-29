import { createStore, applyMiddleware } from 'redux'

import api from './api'
import * as EV from './api/base'

import rootReducer from './reducer/root'

const Store = applyMiddleware()(createStore)(rootReducer)

export default Store
