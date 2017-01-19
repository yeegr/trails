'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  AsyncStorage,
  SegmentedControlIOS,
  ScrollView,
  View
} from 'react-native'

import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as trailsActions from '../../redux/actions/trailsActions'

import TrailList from '../trail/TrailList'

import styles from '../../styles/main'

import {
  CONSTANTS,
  LANG
} from '../../settings'

class MyTrails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIndex: 0,
      cloudTrails: [],
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
        localTrails
      })
    })
  }

  render() {
    const {navigator, cloudTrails} = this.props,
      {selectedIndex, localTrails} = this.state,
      trailList = (selectedIndex === 0) ? cloudTrails : localTrails

    return (
      <View style={styles.global.main}>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <SegmentedControlIOS
            values={[LANG.t('mine.CloudTrails'), LANG.t('mine.LocalTrails')]}
            selectedIndex={this.state.selectedIndex}
            onChange={(event) => {
              this.setState({selectedIndex: event.nativeEvent.selectedSegmentIndex})
            }}
            style={{marginHorizontal: 15, marginBottom: 15}}
          />
        </View>
        <ScrollView style={{}}>
          <TrailList
            navigator={navigator}
            trails={trailList}
          />
        </ScrollView>
      </View>
    )
  }
}

MyTrails.propTypes = {
  navigator: PropTypes.object.isRequired,
  trailsActions: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  cloudTrails: PropTypes.array,
  localTrails: PropTypes.array
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    cloudTrails: state.trails.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trailsActions: bindActionCreators(trailsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTrails)
