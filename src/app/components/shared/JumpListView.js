'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'

import TextView from './TextView'

import {
  Graphics
} from '../../settings'

class JumpListView extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
      rowHasChanged: (r1, r2) => r1 != r2
    })
    this.renderRow = this.renderRow.bind(this)
    this.renderSectionHeader = this.renderSectionHeader.bind(this)

    this.renderSectionLink = this.renderSectionLink.bind(this)

    let keyArray = [],
      childCountArray = [],
      childCount = 0

    Object.keys(this.props.data).forEach((key) => {
      keyArray.push(key)
      childCount += this.props.data[key].length
      childCountArray.push(childCount)
    })

    //this.lastKey = keyArray[keyArray.length - 1]
    //this.lastRowIndex = this.props.data[this.lastKey].length - 1
    this.kvpArray = [{key: keyArray[0], y: 0}]

    keyArray.map((key, index) => {
      if (index > 0) {
        this.kvpArray.push({
          key,
          y: Math.round(index * this.props.sectionHeaderHeight + childCountArray[index - 1] * this.props.cellHeight)
        })
      }
    })

    this.state = {
      sidebarHeight: 580
    }

    this.styles = StyleSheet.create({
      wrapper: {
        flexDirection: 'row'
      },
      sidebar: {
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 10
      },
      header: {
        backgroundColor: Graphics.colors.lightGray,
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: this.props.sectionHeaderHeight
      },
      cell: {
        justifyContent: 'center',
        paddingHorizontal: 10,
        height: this.props.cellHeight
      }
    })
  }

  renderRow(rowData, sectionId, rowId) {
    const text = (this.props.cellData) ? (
        this.props.cellData(rowData)
      ) : rowData,
      content = (
        <View style={this.styles.cell}>
          <TextView
            text={text}
          />
        </View>
      )

    if (this.props.onSelect) {
      return (
        <TouchableOpacity onPress={() => this.props.onSelect(rowData)}>
          {content}
        </TouchableOpacity>
      )
    }

    return (
      {content}
    )
  }

  renderSectionHeader(sectionData, sectionId) {
    return (
      <View style={this.styles.header}>
        <TextView
          text={sectionId}
        />
      </View>
    )
  }

  renderSectionLink(rowData, sectionId, rowId) {
    return (
      <TouchableOpacity onPress={() => this.refs.list.scrollTo({x: 0, y: rowData.y, animated: true})}>
        <View style={{alignItems: 'center', paddingVertical: 2, marginVertical: 2}}>
          <TextView
            textColor={'#007AFF'}
            text={rowData.key.substring(0,1)}
          />
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View ref="wrapper" style={this.styles.wrapper}>
        <ListView
          ref="list"
          enableEmptySections={true}
          removeClippedSubviews={false}
          scrollEnabled={true}
          dataSource={this.dataSource.cloneWithRowsAndSections(this.props.data)}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
        <View ref="sidebar" style={this.styles.sidebar}>
          <ListView
            enableEmptySections={true}
            scrollEnabled={false}
            dataSource={this.dataSource.cloneWithRows(this.kvpArray)}
            renderRow={this.renderSectionLink}
          />
        </View>
      </View>
    )
  }
}

JumpListView.propTypes = {
  data: PropTypes.object.isRequired,
  cellHeight: PropTypes.number.isRequired,
  sectionHeaderHeight: PropTypes.number.isRequired,
  linkComponent: PropTypes.func,
  headerComponent: PropTypes.func,
  cellData: PropTypes.func,
  onSelect: PropTypes.func
}

export default JumpListView
