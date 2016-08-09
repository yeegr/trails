'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

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
          y: index * this.props.sectionHeaderHeight + childCountArray[index - 1] * this.props.cellHeight
        })
      }
    })

    this.state = {
      sidebarHeight: 581.5
    }
  }

  renderRow(rowData, sectionId, rowId) {
    let content = this.props.cellComponent ? this.props.cellComponent(rowData, sectionId, rowId) : (
      <Text>{rowData}</Text>
    )

    if (this.props.onSelect) {
      return (
        <TouchableOpacity onPress={() => this.props.onSelect(rowData)}>
          <View style={{height: this.props.cellHeight}}>
            {content}
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <View style={{height: this.props.cellHeight}}>
        {content}
      </View>
    )
  }

  renderSectionHeader(sectionData, sectionId) {
    let content = this.props.headerComponent ? this.props.headerComponent(sectionData, sectionId) : (
      <Text>{sectionId}</Text>
    )

    return (
      <View style={{height: this.props.sectionHeaderHeight}}>
        {content}
      </View>
    )
  }

  renderSectionLink(rowData, sectionId, rowId) {
    let content = this.props.linkComponent ? this.props.linkComponent(rowData.key) : (
      <Text style={{color: '#007AFF'}}>{rowData.key}</Text>
    )

    return (
      <TouchableOpacity onPress={() => this.refs.list.scrollTo({x: 0, y: rowData.y, animated: true})}>
        <View style={{flex: 1, alignItems: 'center'}}>
          {content}
        </View>
      </TouchableOpacity>
    )
  }

  componentDidMount() {
    setTimeout(() => {
      this.refs.wrapper.measure((fx, fy, width, height, px, py) => {
        this.setState({
          sidebarHeight: height
        })
      })
    }, 1000)
  }

  render() {
    return (
      <View ref="wrapper" style={styles.wrapper}>
        <ListView
          ref="list"
          enableEmptySections={true}
          scrollEnabled={true}
          dataSource={this.dataSource.cloneWithRowsAndSections(this.props.data)}
          renderRow={this.renderRow}
          renderSectionHeader={this.renderSectionHeader}
        />
        <View ref="sidebar" style={[styles.sidebar, {height: this.state.sidebarHeight}]}>
          <ListView
            enableEmptySections={true}
            scrollEnabled={true}
            dataSource={this.dataSource.cloneWithRows(this.kvpArray)}
            renderRow={this.renderSectionLink}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  sidebar: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
  }
})

JumpListView.propTypes = {
  data: PropTypes.object.isRequired,
  cellHeight: PropTypes.number.isRequired,
  sectionHeaderHeight: PropTypes.number.isRequired
}

export default JumpListView
