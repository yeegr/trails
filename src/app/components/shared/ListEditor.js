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
import InputBar from './InputBar'

import {
  Graphics
} from '../../settings'

class ListEditor extends Component {
  constructor(props) {
    super(props)
    this.sendToEdit = this.sendToEdit.bind(this)
    this.saveText = this.saveText.bind(this)
    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.state = {
      list: this.props.list || [],
      listRenderData: this.dataSource.cloneWithRows(this.props.list || []),
      selectedText: '',
      selectedIndex: -1
    }
  }

  renderRow(rowData, sectionId, rowId, highlightRow) {
    const rowText = rowData.toString()

    return (
      <TouchableOpacity key={rowId} onPress={() => {
        this.sendToEdit(rowText, rowId)
        highlightRow(sectionId, rowId)
      }}>
        <View style={[styles.row, (rowId === this.state.selectedIndex) ? styles.highlight : null]}>
          <TextView text={rowText} />
        </View>
      </TouchableOpacity>
    )
  }
  
  sendToEdit(text, index) {
    this.setState({
      selectedText: text,
      selectedIndex: parseInt(index)
    })
  }

  saveText(text, index) {
    (index < 0) ? this.state.list.push(text) : (
      (text.length > 0) ? this.state.list.splice(index, 1, text) : this.state.list.splice(index, 1)
    )

    this.setState({
      selectedText: text,
      listRenderData: this.dataSource.cloneWithRows(this.state.list),
    })
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          enableEmptySections={true}
          scrollEnabled={true}
          style={{flex: 1}}
          dataSource={this.state.listRenderData}
          renderRow={this.renderRow}
        />
        <InputBar
          type={'list'}
          index={this.state.selectedIndex}
          text={this.state.selectedText}
          onSubmit={(text, index) => this.saveText(text, index)}
        />
      </View>
    )
  }
}

ListEditor.propTypes = {
  list: PropTypes.array
}

const styles = StyleSheet.create({
  listEditor: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    borderTopColor: Graphics.colors.border,
    borderTopWidth: 1,
  },
  row: {
    backgroundColor: Graphics.editor.backgroundColor,
    borderBottomColor: Graphics.colors.border,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    padding: 15
  },
  highlight: {
    backgroundColor: '#fcc',
  }
})

export default ListEditor