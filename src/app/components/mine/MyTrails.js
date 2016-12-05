'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  AsyncStorage,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as trailsActions from '../../redux/actions/trailsActions'

import Moment from 'moment'

import Loading from '../shared/Loading'
import TrailList from '../trail/TrailList'

import {
  CONSTANTS,
  AppSettings
} from '../../settings'

class MyTrails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      trails: []
    }
  }

  componentWillMount() {
    this.props.trailsActions.listTrails(this.props.query)

    AsyncStorage
    .getItem(CONSTANTS.ACTION_TARGETS.TEMP)
    .then((tmp) => {
      return JSON.parse(tmp)
    })
    .then((tmp) => {
      let arr = []

      for(var i in tmp) {
        if (i.length === 16) {
          arr.push(tmp[i])
        }
      }

      this.setState({
        trails: arr
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.trails.length > 0) {
      let arr = this.state.trails
      arr = arr.concat(nextProps.trails)

      arr.sort((a, b) => {
        let x = Moment(a.date),
          y = Moment(b.date)
        return (y.diff(x))
      })

      this.setState({
        trails: arr
      })
    }
  }

  render() {
    const {navigator} = this.props,
      {trails} = this.state

    if (trails.length < 1) {
      return <Loading />
    }

    return (
      <View style={{paddingTop: 20}}>
        <TrailList
          navigator={navigator}
          trails={trails}
        />
      </View>
    )
  }
}

MyTrails.propTypes = {
  navigator: PropTypes.object.isRequired,
  trailsActions: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    trails: state.trails.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trailsActions: bindActionCreators(trailsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTrails)
