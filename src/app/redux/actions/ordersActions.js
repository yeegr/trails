'use strict'

import * as ACTIONS from '../constants/ordersConstants'
import * as loginActions from './loginActions'
import {
  FETCH,
  AppSettings
} from '../../../common/__'

// reset order
export const resetOrder = () => {
  return {
    type: ACTIONS.RESET_ORDER
  }
}

// set signups
export const setSignUps = (signUps) => {
  return {
    type: ACTIONS.SET_SIGN_UPS,
    signUps
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
          dispatch(loginActions.reloadUser())
          dispatch(createOrderSuccess(res))
        } else {
          dispatch(createOrderFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(createOrderFailure(err)))
  }
}

// update order
const updateOrderRequest = () => {
  return {
    type: ACTIONS.UPDATE_ORDER_REQUEST
  }
}

const updateOrderSuccess = (order) => {
  return {
    type: ACTIONS.UPDATE_ORDER_SUCCESS,
    order
  }
}

const updateOrderFailure = (message) => {
  return {
    type: ACTIONS.UPDATE_ORDER_FAILURE,
    message
  }
}

export const updateOrder = (result) => {
  let config = Object.assign({}, FETCH.PUT, {
    body: JSON.stringify(result)
  })

  return (dispatch) => {
    dispatch(updateOrderRequest())

    return fetch(AppSettings.apiUri + 'orders', config)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res._id) {
          dispatch(loginActions.reloadUser())
          dispatch(updateOrderSuccess(res))
        } else {
          dispatch(updateOrderFailure(res.message))
          return Promise.reject(res)
        }
      })
      .catch((err) => dispatch(updateOrderFailure(err)))
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

const listOrdersFailure = (message) => {
  return {
    type: ACTIONS.LIST_ORDERS_FAILURE,
    message
  }
}

export const listOrders = (params) => {
  return (dispatch) => {
    dispatch(listOrdersRequest(params))

    return fetch(AppSettings.apiUri + 'orders/' + params)
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        if (res.error) {
          dispatch(listOrdersFailure(res.error))
          return Promise.reject(res)
        } else {
         dispatch(listOrdersSuccess(res))
        }
      })
      .catch((err) => {
        dispatch(listOrdersFailure(err))
      })
  }
}
