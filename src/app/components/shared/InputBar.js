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
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'

import {connect} from 'react-redux'

import Avatar from './Avatar'
import Icon from './Icon'
import TextView from './TextView'

class InputBar extends Component {
  constructor(props) {
    super(props)
    this.create = this.create.bind(this)
    this.submit = this.submit.bind(this)


    this.state = {
      text: this.props.text || '',
      index: this.props.index || -1
    }
  }

  create() {
    this.setState({
      text: '',
      index: -1,
    })
  }

  submit() {
    let tmp = this.state.text.trim()
    this.props.onSubmit(tmp, this.state.index)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text,
      index: nextProps.index
    })

    this.refs.textInput.focus()
  }

  resize(evt) {
    var height = evt.nativeEvent.contentSize.height,
      height = (height > Graphics.textInput.maxHeight) ? Graphics.textInput.maxHeight : Math.max(Graphics.textInput.minHeight, height)

    this.setState({
      height
    })
  }

  render() {
    let left = null

    switch (this.props.type) {
      case 'list':
        left = (
          <TouchableOpacity onPress={this.create}>
            <View style={styles.button}>
              <Icon
                backgroundColor={Graphics.colors.transparent}
                fillColor={Graphics.colors.primary}
                sideLength={Graphics.avatar.M}
                type="plus"
              />
            </View>
          </TouchableOpacity>
        )
      break

      case 'comment':
        left = (
          <View style={{paddingHorizontal: 10}}>
            <Avatar user={this.props.user} size='S' />
          </View>
        )
      break
    }

    return (
      <View style={styles.wrapper}>
        {left}
        <View style={styles.input}>
          <TextInput
            ref='textInput'
            autoFocus={true}
            autoCorrect={true}
            multiline={true}
            style={styles.text}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
        </View>
        <TouchableOpacity onPress={this.submit}>
          <View style={styles.button}>
            <Icon
              backgroundColor={Graphics.colors.transparent}
              fillColor={Graphics.colors.primary} 
              sideLength={Graphics.avatar.M}
              type="ok"
            />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    backgroundColor: Graphics.colors.white,
    borderTopColor: Graphics.colors.border,
    borderTopWidth: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  input: {
    borderColor: Graphics.colors.border,
    borderRadius: 2,
    borderWidth: 1,
    flex: 1,
  },
  text: {
    fontFamily: Graphics.fontStyles.default,
    fontSize: Graphics.fontSizes.default,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  button: {
    margin: 5
  }
})

InputBar.propTypes = {
  type: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  text: PropTypes.string,
  index: PropTypes.number
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

export default connect(mapStateToProps)(InputBar)