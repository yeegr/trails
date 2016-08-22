'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  View
} from 'react-native'

import AreaList from './area/AreaList'

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <AreaList
        params=""
      />
    )
  }
}

export default App