'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  TouchableOpacity,
  View
} from 'react-native'

import SimpleContact from '../shared/SimpleContact'
import TextView from '../shared/TextView'

import styles from '../../styles/main'

import {
  LANG,
  UTIL,
  Graphics
} from '../../settings'

class SignUpList extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      rowHasChanged: (r1, r2) => r1 != r2
    })
    this.renderRow = this.renderRow.bind(this)
    this.mapData = this.mapData.bind(this)
    this.eventPage = this.eventPage.bind(this)

    this.state = {
      data: this.mapData(this.props.event.groups)
    }
  }

  mapData(groups) {
    let tmp = {}

    groups.map((group, index) => {
      let sectionId = UTIL.formatEventGroupLabel(this.props.event, index)

      tmp[sectionId] = []

      group.signUps.map((signUp) => {
        tmp[sectionId].push(signUp)
      })
    })

    return tmp 
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <View style={styles.list.row}>
        <SimpleContact 
          label={rowData.name}
          number={rowData.mobile}
        />
      </View>
    )
  }

  renderSectionHeader(sectionData, sectionId) {
    return (
      <View style={styles.list.header}>
        <TextView
          style={{marginBottom: 2}}
          textColor={Graphics.textColors.overlay}
          text={sectionId}
        />
      </View>
    )
  }

  eventPage(id) {
    this.props.navigator.push({
      id: 'EventDetail',
      title: LANG.t('event.EventDetail'),
      passProps: {
        id
      }
    })
  }

  render() {
    const {event} = this.props

    return (
      <View style={{flex: 1, marginTop: Graphics.page.marginTop}}>
        <TouchableOpacity onPress={() => this.eventPage(event._id)}>
          <TextView
            style={{fontWeight: '400', marginBottom: 5, marginTop: 15, paddingHorizontal: 15}}
            fontSize={'XL'}
            textColor={Graphics.textColors.link}
            text={event.title}
          />
        </TouchableOpacity>
        <ListView
          enableEmptySections={true}
          scrollEnabled={true}
          dataSource={this.dataSource.cloneWithRowsAndSections(this.state.data)}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    )
  }
}

SignUpList.propTypes = {
  navigator: PropTypes.object.isRequired,
  event: PropTypes.object.isRequired,
}

export default SignUpList
