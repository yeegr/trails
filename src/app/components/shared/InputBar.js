'use strict'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../settings'

import React, {
  Component
} from 'react'

import {
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import styles from '../../styles/main'

export default class InputBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: this.props.text || '',
      index: this.props.index || -1,
      height: Graphics.textInput.minHeight
    }
  }

  onPress() {
    var tmp = this.state.text.trim()
    this.setState({
      text: tmp
    })
    this.props.setter(tmp, this.state.index)
  }

  render() {
    return (
      <View style={styles.editor.inputBar}>
        <TextInput
          multiline={true}
          style={[styles.editor.textInput, styles.editor.textInputBorder, {height: this.state.height}]}
          onChange={(evt) => {
            var height = evt.nativeEvent.contentSize.height,
              height = (height > Graphics.textInput.maxHeight) ? Graphics.textInput.maxHeight : Math.max(Graphics.textInput.minHeight, height)

            this.setState({
              text: evt.nativeEvent.text,
              height: height,
            })
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.editor.txtButton}
          onPress={() => this.onPress()}
        >
          <Text style={styles.editor.txtButtonText}>{Lang.Add}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}