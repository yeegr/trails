'use strict'

import {CONFIG} from '../../../constants'
import {AppSettings} from '../../settings'
import * as ACTIONS from '../constants/ordersConstants'

// list orders
const requestOrders = (params) => {
  return {
    type: ACTIONS.REQUEST_ORDERS,
    params
  }
}

const receiveOrders = (list) => {
  return {
    type: ACTIONS.LIST_ORDERS_SUCCESS,
    list
  }
}

const listOrdersError = (message) => {
  return {
    type: ACTIONS.LIST_ORDERS_FAILURE,
    message
  }
}

export const listOrders = (params) => {
  return (dispatch) => {
    dispatch(requestOrders(params))

    return fetch(AppSettings.apiUri + 'orders/?' + JSON.stringify(params))
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(listOrdersError(response.error))
          return Promise.reject(response)
        } else {
         dispatch(receiveOrders(response))
        }
      })
      .catch((err) => {
        dispatch(listOrdersError(err))
      })
  }
}
