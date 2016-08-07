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
  ListView,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as eventsActions from '../../containers/actions/eventsActions'

import Loading from '../shared/Loading'
import TextView from '../shared/TextView'
import EditLink from '../shared/EditLink'
import {formatEventGroupLabel} from '../../../common'
import styles from '../../styles/main'

const SignUpList = (props) => {
  const {event, navigator} = props,
  
  dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2,
    sectionHeaderHasChanged : (s1, s2) => s1 !== s2
  }),

  renderRow = (rowData, sectionId, rowId) => {
    return (
      <View style={styles.detail.section}>
        <TextView
          text={formatEventGroupLabel(event, rowId)}
        />
      </View>
    )
  },

  renderSectionHeader = (sectionData, sectionId) => {
    return (
      <View>
        <TextView
          text={formatEventGroupLabel(event, sectionId)}
        />
      </View>
    )
  }

  return (
    <ListView
      enableEmptySections={true}
      scrollEnabled={false}
      dataSource={dataSource.cloneWithRowsAndSections(props.event.groups)}
      renderRow={renderRow}
      renderSectionHeader={renderSectionHeader}
    />
  )
}

export default SignUpList
