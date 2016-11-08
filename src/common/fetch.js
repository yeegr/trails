'use strict'

// fetch configurations
export const FETCH = {
  GET: {
    method: 'GET'
  },

  POST: {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
  },

  UPDATE: {
    method: 'UPDATE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },

  PUT: {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },

  DELETE: {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}
