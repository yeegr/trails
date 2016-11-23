'use strict'

import * as ACTIONS from '../constants/ordersConstants'
import {
  FETCH,
  AppSettings
} from '../../settings'

export const resetOrder = () => {
  return {
    type: ACTIONS.RESET_ORDER
  }
}

// create order
const createOrderRequest = () => {
  return {
    type: ACTIONS.CREATE_ORDER_REQUEST
  }
}

const createOrderSuccess = (order) => {
  return {
    type: ACTIONS.CREATE_ORDER_SUCCESS,
    order
  }
}

const createOrderFailure = (message) => {
  return {
    type: ACTIONS.CREATE_ORDER_FAILURE,
    message
  }
}

export const createOrder = (order) => {
  let config = Object.assign({}, FETCH.POST, {
    body: JSON.stringify(order)
  })

  return (dispatch) => {
    dispatch(createOrderRequest())

    return fetch(AppSettings.apiUri + 'orders', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res._id) {
          dispatch(createOrderSuccess(res))
        } else {
          dispatch(createOrderFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(createOrderFailure(err)))
  }
}

// list orders
const listOrdersRequest = (params) => {
  return {
    type: ACTIONS.LIST_ORDERS_REQUEST,
    params
  }
}

const listOrdersSuccess = (list) => {
  return {
    type: ACTIONS.LIST_ORDERS_SUCCESS,
    list
  }
}

const listOrderFailure = (message) => {
  return {
    type: ACTIONS.LIST_ORDERS_FAILURE,
    message
  }
}

export const listOrders = (params) => {
  return (dispatch) => {
    dispatch(listOrderRequest(params))

    return fetch(AppSettings.apiUri + 'orders/?' + JSON.stringify(params))
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        if (response.error) {
          dispatch(listOrderFailure(response.error))
          return Promise.reject(response)
        } else {
         dispatch(listOrderSuccess(response))
        }
      })
      .catch((err) => {
        dispatch(listOrderFailure(err))
      })
  }
}
