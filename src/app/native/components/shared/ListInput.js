'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  TextInput,
  View
} from 'react-native'

import Popup from './Popup'

import {
  AppSettings,
  Graphics
} from '../../settings'

class ListInput extends Component {
  constructor(props) {
    super(props)
    this._focus = this._focus.bind(this)
    this._resize = this._resize.bind(this)
    this._submit = this._submit.bind(this)

    let multiline = true,
      blurOnSubmit = true,
      maxLength = null

    if (this.props.type === 'article') {
      blurOnSubmit = false
      multiline = false
    }

    if (this.props.type === 'tag') {
      maxLength = AppSettings.maxTagLength
      multiline = false
    }

    this.inputInitHeight = 32

    this.state = {
      text: this.props.text || '',
      inputHeight: this.inputInitHeight,
      maxLength: this.props.maxLength || maxLength,
      multiline,
      blurOnSubmit,
      showPopup: false,
      tmp: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text
    })

    this.refs.textInput.focus()
  }

  _focus() {
    if (this.props.type === 'article') {
      this.setState({
        showPopup: true,
        tmp: this.state.text
      })
    }
  }

  _resize(evt) {
    if (this.props.multiline) {
      let inputHeight = Math.round(evt.nativeEvent.contentSize.height)
      inputHeight = (inputHeight <= Graphics.textInput.maxHeight) ? inputHeight : Graphics.textInput.maxHeight

      this.setState({
        inputHeight
      })
    }
  }

  _submit() {
    let tmp = this.state.text.trim()
    this.props.onSubmit(tmp)

    this.setState({
      inputHeight: this.inputInitHeight
    })
  }

  render() {
    let placeholder = this.props.placeholder || ''

    return (
      <View style={styles.wrapper}>
        <View style={styles.input}>
          <View style={styles.inputBorder}>
            <TextInput
              ref="textInput"
              autoFocus={false}
              autoCorrect={this.props.autoCorrect || true}
              blurOnSubmit={this.state.blurOnSubmit}
              maxLength={this.state.maxLength}
              multiline={this.state.multiline}
              style={[styles.textInput, {height: this.state.inputHeight}]}
              placeholder={placeholder}
              onFocus={this._focus}
              onChange={this._resize}
              onChangeText={(text) => this.setState({text})}
              value={(this.props.type === 'article') ? '' : this.state.text}
              onSubmitEditing={this._submit}
            />
          </View>
        </View>
        <Popup
          visible={this.state.showPopup}
          title={''}
          onConfirm={() => this.setState({text: this.state.tmp})}
          content={
            <TextInput
              multiline={true}
              onChangeText={(tmp) => this.setState({tmp})}
              value={this.state.tmp}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.lightGray,
    borderTopColor: Graphics.colors.border,
    borderTopWidth: 1
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  inputBorder: {
    alignItems: 'center',
    borderColor: Graphics.colors.border,
    borderRadius: 2,
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row'
  },
  textInput: {
    backgroundColor: Graphics.colors.white,
    fontFamily: Graphics.fontStyles.default,
    fontSize: Graphics.fontSizes.default,
    flex: 1,
    padding: 5
  }
})

ListInput.propTypes = {
  type: PropTypes.string,
  autoCorrect: PropTypes.bool,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string
}

export default ListInput