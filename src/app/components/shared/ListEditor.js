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
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

class ListEditor extends Component {
  constructor(props) {
    super(props)
    this.createItem = this.createItem.bind(this)
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
          <Text>{rowText}</Text>
        </View>
      </TouchableOpacity>
    )
  }
  
  createItem() {
    this.setState({
      selectedText: '',
      selectedIndex: -1
    })
  }

  sendToEdit(text, index) {
    this.setState({
      selectedText: text,
      selectedIndex: parseInt(index)
    })
  }

  saveText(text, index) {
    (index < 0) ? this.state.list.push(text) : this.state.list.splice(index, 1, text)

    this.setState({
      selectedText: text,
      listRenderData: this.dataSource.cloneWithRows(this.state.list),
    })
  }
  
  render() {
    return (
      <View style={styles.listEditor}>
        <ListView
          enableEmptySections={true}
          style={styles.list}
          scrollEnabled={true}
          dataSource={this.state.listRenderData}
          renderRow={this.renderRow}
        />
        <InputBar text={this.state.selectedText} index={this.state.selectedIndex} saveText={(text, index) => this.saveText(text, index)} />
      </View>
    )
  }
}

class InputBar extends Component {
  constructor(props) {
    super(props)
    this.createItem = this.createItem.bind(this)
    this.onChange = this.onChange.bind(this)
    this.saveText = this.saveText.bind(this)

    this.state = {
      text: this.props.text || '',
      index: this.props.index || -1,
      height: AppSettings.minTextInputHeight
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text,
      index: nextProps.index
    })

    this.refs.textInput.focus()
  }

  saveText() {
    var tmp = this.state.text.trim()
    this.props.saveText(tmp, this.state.index)
  }

  createItem() {
    this.setState({
      text: '',
      index: -1,
      height: AppSettings.minTextInputHeight
    })
  }

  onChange(evt) {
    var height = evt.nativeEvent.contentSize.height,
      height = (height > AppSettings.maxTextInputHeight) ? AppSettings.maxTextInputHeight : Math.max(AppSettings.minTextInputHeight, height)

    this.setState({
      text: evt.nativeEvent.text,
      height: height
    })
  }

  render() {
    return (
      <View style={styles.inputBar}>
        <TouchableOpacity onPress={this.createItem}>
          <View style={styles.inputButtonLeft}>
            <Text style={styles.inputButtonText}>{Lang.Add}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.inputWrapper}>
          <TextInput
            ref='textInput'
            autoFocus={true}
            autoCorrect={false}
            multiline={true}
            style={[styles.textInput, {height: this.state.height}]}
            onChange={(evt) => this.onChange(evt)}
            value={this.state.text}
          />
        </View>
        <TouchableOpacity onPress={this.saveText}>
          <View style={styles.inputButtonRight}>
            <Text style={styles.inputButtonText}>{Lang.Save}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

InputBar.propTypes = {
  saveText: PropTypes.func.isRequired,
  text: PropTypes.string,
  index: PropTypes.number
}

const styles = StyleSheet.create({
  listEditor: {
    flex: 1,
    flexDirection: 'column',
  },
  list: {
    borderTopColor: AppSettings.color.lightGray,
    borderTopWidth: 1,
  },
  row: {
    backgroundColor: AppSettings.color.listItemBackground,
    borderBottomColor: AppSettings.color.lightGray,
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    padding: 15
  },
  highlight: {
    backgroundColor: '#fcc',
  },

  inputBar: {
    alignItems: 'center',
    backgroundColor: AppSettings.color.inputBackground,
    borderTopColor: AppSettings.color.lightGray,
    borderTopWidth: 1,
    flexDirection: 'row',
    padding: 10,
  },
  inputWrapper: {
    borderColor: AppSettings.color.lightGray,
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    overflow: 'hidden',
  },
  textInput: {
    color: AppSettings.color.midGray,
    fontSize: 16,
    height: 44.5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  inputButtonLeft: {
    flex: 0,
    paddingLeft: 5,
    paddingRight: 15,
  },
  inputButtonRight: {
    flex: 0,
    paddingLeft: 15,
    paddingRight: 5,
  },
  inputButtonText: {
    color: AppSettings.color.primary,
  },
})

export default ListEditor