'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'

import Icon from './Icon'

import {
  Graphics
} from '../../../../common/__'

class StringInput extends Component {
  constructor(props) {
    super(props)
    this._clear = this._clear.bind(this)
  }
  
  _clear() {
    this.props.onChangeText('')
  }

  render() {
    return (
      <View style={styles.wrapper}>
        <TextInput
          autoCorrect={this.props.autoCorrect || true}
          autoFocus={this.props.autoFocus || false}
          keyboardType={this.props.keyboardType || 'default'}
          maxLength={this.props.maxLength || 50}
          placeholder={this.props.placeholder || ''}
          style={styles.input}
          onChangeText={(value) => this.props.onChangeText(value)}
          value={this.props.value}
        />
        <TouchableOpacity style={styles.clear} onPress={this._clear}>
          <Icon
            backgroundColor={Graphics.colors.transparent}
            fillColor={Graphics.colors.lightGray}
            sideLength={Graphics.avatar.S}
            path={Graphics.inputbar.remove}
          />
        </TouchableOpacity>
      </View>    
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row'
  },
  input: {
    backgroundColor: Graphics.colors.transparent,
    color: Graphics.colors.midGray,
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  clear: {
    paddingHorizontal: 5,
    paddingVertical: 10
  }
})

StringInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  keyboardType: PropTypes.string,
  maxLength: PropTypes.number,
  placeholder: PropTypes.string,
}

export default StringInput