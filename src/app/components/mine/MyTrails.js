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
  CONSTANTS
} from '../../settings'

class MyTrails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      allTrails: [],
      savedTrails: this.props.savedTrails,
      localTrails: []
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
      let localTrails = []

      for(let i in tmp) {
        if (i.length === 16) {
          localTrails.push(tmp[i])
        }
      }

      this.setState({
        localTrails,
        allTrails: localTrails
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.savedTrails.length > 0) {
      let arr = this.state.localTrails
      arr = arr.concat(nextProps.savedTrails)

      arr.sort((a, b) => {
        let x = Moment(a.date),
          y = Moment(b.date)
        return (y.diff(x))
      })

      this.setState({
        allTrails: arr
      })
    }
  }

  render() {
    const {navigator} = this.props,
      {allTrails} = this.state

    if (allTrails.length < 1) {
      return <Loading />
    }

    return (
      <View style={{paddingTop: 20}}>
        <TrailList
          navigator={navigator}
          trails={allTrails}
        />
      </View>
    )
  }
}

MyTrails.propTypes = {
  navigator: PropTypes.object.isRequired,
  trailsActions: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  savedTrails: PropTypes.array,
  localTrails: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    savedTrails: state.trails.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trailsActions: bindActionCreators(trailsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTrails)
