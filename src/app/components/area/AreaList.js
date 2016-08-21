'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  View,
  ScrollView
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as areasActions from '../../containers/actions/areasActions'

import Loading from '../shared/Loading'
import AreaCard from './AreaCard'
import styles from '../../styles/main'

class AreaList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.areasActions.listAreas(this.props.params)
  }

  render() {
    const {areas, navigator} = this.props

    if (!areas) {
      return <Loading />
    }

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        scrollEnabled={true}
        style={styles.global.home}
      >
      <View style={{height: 1500}}>
        {
          areas.map((area, index) => {
            return (
              <AreaCard
                key={index}
                navigator={navigator}
                data={area}
              />
            )
          })
        }
      </View>
      </ScrollView>
    )
  }
}


function mapStateToProps(state, ownProps) {
  return {
    areas: state.areas.list
  }
}

function mapDispatchToProps(dispatch) {
  return {
    areasActions: bindActionCreators(areasActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AreaList)
