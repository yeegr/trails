'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ListView,
  StyleSheet,
  View,
} from 'react-native'

import TextView from './TextView'

const OrderedList = (props) => {
  const dataSource = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 != r2
  }),
  renderRow = (rowData, sectionId, rowId) => {
    return (
      <View key={rowId} style={styles.wrapper}>
        <View style={styles.index}>
          <TextView style={{textAlign: 'right'}} text={(parseInt(rowId) + 1) + '.'} />
        </View>
        <View style={styles.content}>
          <TextView text={rowData} />
        </View>
      </View>
    )
  }

  return (
    <ListView
      enableEmptySections={true}
      dataSource={dataSource.cloneWithRows(props.content)}
      renderRow={renderRow}
    />
  )
},
styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    marginBottom: 2
  },
  index: {
    marginRight: 5,
    paddingTop: 1,
    width: 20
  },
  content: {
    flex: 1
  }
})

OrderedList.propTypes = {
  content: PropTypes.array.isRequired
}

export default OrderedList