'use strict'

import {
  createStore,
  applyMiddleware
} from 'redux'

import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import createLogger from 'redux-logger'

import rootReducer from '../reducers/_rootReducer'

const loggerMiddleware = createLogger(),
  createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
//    loggerMiddleware
  )(createStore)

export default function configureStore(initialState) {
  return createStoreWithMiddleware(
    rootReducer,
    initialState
  )
}