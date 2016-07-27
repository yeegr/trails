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
  StyleSheet,
  Text,
  View,
} from 'react-native'

class OrderedList extends Component {
  constructor(props) {
    super(props)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })
  }

  renderRow(rowData, sectionId, rowId) {
    return (
      <View key={rowId} style={styles.row}>
        <Text style={styles.index}>{parseInt(rowId) + 1}.</Text>
        <Text style={styles.content}>{rowData}</Text>
      </View>
    )
  }

  render() {
    const {content} = this.props

    return (
      <ListView
        enableEmptySections={true}
        dataSource={this.dataSource.cloneWithRows(content)}
        renderRow={this.renderRow}
      />
    )
  }
}

OrderedList.propTypes = {
  content: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    marginBottom: 2
  },
  index: Object.assign({},
    AppSettings.textStyles.normal,
    {
      flex: 0,
      marginRight: 5,
      paddingTop: 1,
      textAlign: 'right',
      width: 20
    }),
  content: Object.assign({},
    AppSettings.textStyles.normal,
    {
      flex: 1
    })
})

export default OrderedList