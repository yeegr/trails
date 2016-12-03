'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as trailsActions from '../../redux/actions/trailsActions'

import Loading from '../shared/Loading'
import TrailList from '../trail/TrailList'

import {
  AppSettings
} from '../../settings'

class MyTrails extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.trailsActions.listTrails(this.props.query)
  }

  render() {
    const {trails, navigator} = this.props

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
