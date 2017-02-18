'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  StyleSheet,
  TextInput
} from 'react-native'

class RichTextEditor extends Component {
  constructor(props) {
    super(props)

    this.wrapperHeight = 400
    this.contentHeight = 400
  }

  render() {
    return (
      <ScrollView
        ref="_scrollView"
        onLayout={(evt) => {
          let y = 0
          this.wrapperHeight = evt.nativeEvent.layout

          if (this.wrapperHeight < this.contentHeight) {
            y = this.contentHeight - this.wrapperHeight
          }

          this.refs._scrollView.scrollTo({x: 0, y, animated: true})
        }}
        onContentSizeChange={(width, height) => {
          this.contentHeight = Math.round(height)
        }}
        style={styles.wrapper}
      >
        <TextInput
          autoFocus={true}
          autoCorrect={false}
          maxLength={this.props.maxLength}
          multiline={true}
          style={styles.input}
          placeholder={this.props.placeholder}
          onChangeText={(value) => this.props.onChangeText(value)}
          value={this.props.value}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 30,
    height: 400
  }
})

RichTextEditor.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  maxLength: PropTypes.number
}

export default RichTextEditor