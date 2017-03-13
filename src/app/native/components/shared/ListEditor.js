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

import Swipeout from 'react-native-swipeout'
import KeyboardSpacer from 'react-native-keyboard-spacer'

import ListInput from './ListInput'
import TextView from './TextView'

import {
  LANG,
  Device,
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
      dataSource: this.dataSource.cloneWithRows(this.props.list || []),
      selectedText: '',
      selectedIndex: -1
    }

    this.multiline = (this.props.type !== 'tag' && this.props.type !== 'article')
    this.numberOfLines = (this.props.type === 'tag') ? 1 : 2
    this.wrapperHeight = Device.height
    this.contentHeight = 0
  }

  renderRow(rowData, sectionId, rowId) {
    const rowText = rowData.toString(),
      rowIndex = parseInt(rowId),
      swipeoutBtns = (i) => [{
        text: LANG.t('glossary.Delete'),
        backgroundColor: '#ff0000',
        onPress: () => this._deleteItem(i)
      }]

    return (
      <Swipeout 
        key={rowId}
        autoClose={true}
        right={swipeoutBtns(rowId)}
      >
        <TouchableOpacity onPress={() => {this._sendToEdit(rowText, rowIndex)}}>
          <View style={[styles.row, (rowIndex === this.state.selectedIndex) ? styles.highlight : null]}>
            <TextView
              ellipsizeMode={'tail'}
              numberOfLines={this.numberOfLines}
              text={rowText}
            />
          </View>
        </TouchableOpacity>
      </Swipeout>
    )
  }

  _addItem() {
    this.setState({
      selectedText: '',
      selectedIndex: -1
    })
  }

  _deleteItem(index) {
    let list = this.state.list
    list.splice(index, 1)

    this.setState({
      list,
      dataSource: this.dataSource.cloneWithRows(list),
      selectedText: '',
      selectedIndex: -1
    })
  }
  
  _sendToEdit(selectedText, selectedIndex) {
    this.setState({
      selectedText,
      selectedIndex
    })
  }

  _setListItem(text) {
    let index = this.state.selectedIndex,
      list = this.state.list

    if (index < 0) {
      list.push(text)
    } else {
      (text.length > 0) ? list.splice(index, 1, text) : list.splice(index, 1)
    }

    this.setState({
      list,
      dataSource: this.dataSource.cloneWithRows(list),
      selectedText: '',
      selectedIndex: -1
    })
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <ListView
          ref="_scrollView"
          enableEmptySections={true}
          scrollEnabled={true}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={true}
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          onLayout={(evt) => {
            let {height} = evt.nativeEvent.layout,
              y = 0

            if (height >= this.contentHeight || this.state.selectedIndex === 0) {
              y = 0
            } else if (this.state.selectedIndex < 0 || this.state.selectedIndex === (this.state.list.length - 1)) {
              y = this.contentHeight - height
            } else {
              let rowHeight = Math.round(height / this.state.list.length),
                r = height - rowHeight * (this.state.selectedIndex),
                t = this.contentHeight - height

              y = (r > t) ? t : r
            }

            this.refs._scrollView.scrollTo({x: 0, y, animated: true})
          }}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.contentHeight = Math.round(contentHeight)
          }}
        />
        <ListInput
          type={this.props.type}
          text={this.state.selectedText}
          multiline={this.multiline}
          onSubmit={(text) => this._setListItem(text)}
        />
        <KeyboardSpacer />
      </View>
    )
  }
}

ListEditor.propTypes = {
  list: PropTypes.array,
  type: PropTypes.string
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