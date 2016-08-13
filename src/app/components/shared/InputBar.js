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

import Rating from './Rating'
import Avatar from './Avatar'
import Icon from './Icon'
import TextView from './TextView'

class InputBar extends Component {
  constructor(props) {
    super(props)
    this.create = this.create.bind(this)
    this.submit = this.submit.bind(this)
    this.toggle = this.toggle.bind(this)

    this.state = {
      index: this.props.index || -1,
      text: this.props.text || '',
      rating: this.props.rating || 0,
      showRater: this.props.showRater || false
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

    if (tmp.length > 0) {
      switch (this.props.type) {
        case 'list':
          this.props.onSubmit(tmp, this.state.index)
        break

        case 'comment':
          if (this.state.rating < 1) {
            this.setState({showRater: true})
          } else {
            this.setState({
              rating: 0,
              showRater: false
            })

            this.props.onSubmit({
              comment: this.state.text,
              rating: this.state.rating
            })
          }
        break
      }
    }
  }

  toggle() {
    let showRater = this.state.showRater
    this.setState({
      showRater: !showRater
    })
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
    let placeholder = this.props.placeholder || '', 
    left = null,
    star = null,
    rater = (this.state.showRater) ? (
      <View style={styles.rater}>
        <Rating
          type="M"
          value={this.state.rating}
          onValueChange={(rating) => this.setState({rating})}
        />
      </View>
    ) : null

    switch (this.props.type) {
      case 'list':
        left = (
          <TouchableOpacity onPress={this.create}>
            <View style={styles.button}>
              <Icon
                backgroundColor={Graphics.colors.transparent}
                fillColor={Graphics.colors.primary}
                sideLength={Graphics.avatar.S}
                type="plus"
              />
            </View>
          </TouchableOpacity>
        )
      break

      case 'comment':
        left = (
          <View style={styles.button}>
            <Avatar user={this.props.user} size="S" />
          </View>
        ),
        star = (
          <TouchableOpacity onPress={this.toggle}>
            <View style={[styles.button, {paddingLeft: 0}]}>
              <Icon
                backgroundColor={Graphics.colors.transparent}
                fillColor={Graphics.colors.primary}
                sideLength={Graphics.avatar.S}
                type="star"
              />
            </View>
          </TouchableOpacity>
        )
      break
    }

    return (
      <View style={styles.wrapper}>
        {rater}
        <View style={styles.input}>
          {left}
          <View style={styles.inputBorder}>
            <Icon
              backgroundColor={Graphics.colors.transparent}
              fillColor={Graphics.colors.lightGray} 
              sideLength={Graphics.avatar.S}
              type="edit"
            />
            <TextInput
              ref='textInput'
              autoFocus={true}
              autoCorrect={true}
              multiline={true}
              style={styles.textInput}
              placeholder={placeholder}
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
            />
          </View>
          <TouchableOpacity onPress={this.submit}>
            <View style={styles.button}>
              <Icon
                backgroundColor={Graphics.colors.transparent}
                fillColor={Graphics.colors.primary} 
                sideLength={Graphics.avatar.S}
                type="checkmark"
              />
            </View>
          </TouchableOpacity>
          {star}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.colors.white,
    borderTopColor: Graphics.colors.border,
    borderTopWidth: 1
  },
  rater: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  input: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
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
    fontFamily: Graphics.fontStyles.default,
    fontSize: Graphics.fontSizes.default,
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  button: {
    padding: 10
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