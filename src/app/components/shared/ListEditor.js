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

import KeyboardSpacer from 'react-native-keyboard-spacer'

import InputBar from './InputBar'
import TextView from './TextView'

import {
  Graphics
} from '../../settings'

class ListEditor extends Component {
  constructor(props) {
    super(props)
    this._sendToEdit = this._sendToEdit.bind(this)
    this._setListItem = this._setListItem.bind(this)

    this.renderRow = this.renderRow.bind(this)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 != r2
    })

    this.state = {
      list: this.props.list || [],
      dataSource: this.dataSource,
      selectedText: '',
      selectedIndex: -1
    }
  }

  componentDidMount() {
    this.setState({
      dataSource: this.dataSource.cloneWithRows(this.props.list || []),
    })
  }

  renderRow(rowData, sectionId, rowId) {
    const rowText = rowData.toString(),
      rowIndex = parseInt(rowId)

    return (
      <TouchableOpacity key={rowId} onPress={() => {this._sendToEdit(rowText, rowIndex)}}>
        <View style={[styles.row, (rowIndex === this.state.selectedIndex) ? styles.highlight : null]}>
          <TextView text={rowText} />
        </View>
      </TouchableOpacity>
    )
  }
  
  _sendToEdit(selectedText, selectedIndex) {
    this.setState({
      selectedText,
      selectedIndex
    })
  }

  _setListItem(text, index) {
    let list = this.state.list

    if (index < 0) {
      list.push(text)
      this.refs.list.scrollTo()
    } else {
      (text.length > 0) ? list.splice(index, 1, text) : list.splice(index, 1)
    }

    this.setState({
      selectedText: text,
      dataSource: this.dataSource.cloneWithRows(list)
    })
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          ref="list"
          enableEmptySections={true}
          scrollEnabled={true}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
        />
        <InputBar
          type={'list'}
          index={this.state.selectedIndex}
          text={this.state.selectedText}
          onSubmit={(text, index) => this._setListItem(text, index)}
        />
        <KeyboardSpacer />
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
    backgroundColor: Graphics.colors.highlight,
  }
})

export default ListEditor