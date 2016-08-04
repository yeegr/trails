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
  Modal,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

class ActionPicker extends Component {
  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.onConfirm = this.onConfirm.bind(this)

    let values = []
    this.props.labels.map((label, index) => {
      values.push(index)
    })

    this.state = {
      selectedValue: this.props.selectedValue || values[0],
      labels: this.props.labels,
      values: this.props.values || values
    }
  }

  onCancel() {
    this.props.onCancel()
  }

  onConfirm() {
    this.props.onConfirm(this.state.selectedValue)
    this.onCancel()
  }

  render() {
    if (!this.props.showPicker) {
      return null
    }

    const mixStyles = Object.assign(styles, this.props.customStyles || null),
      title = (this.props.title) ? <Text style={mixStyles.titleText}>{this.props.title}</Text> : null
    
    return (
      <Modal animationType={"fade"} transparent={true}>
        <View style={styles.wrapper}>
          <View style={styles.actionSheet}>
            <View style={styles.toolbar}>
              <TouchableOpacity onPress={this.onCancel}>
                <Text style={[{color: Graphics.colors.midGray}, mixStyles.buttonText]}>{this.props.cancelText}</Text>
              </TouchableOpacity>
              <View style={styles.title}>
              {title}
              </View>
              <TouchableOpacity onPress={this.onConfirm}>
                <Text style={mixStyles.buttonText}>{this.props.confirmText}</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={this.state.selectedValue}
              onValueChange={(value) => this.setState({selectedValue: value})}
            >
            {
              this.state.labels.map((label, index) => {
                return (
                  <Picker.Item label={label} value={this.state.values[index]} key={index} />
                )
              })
            }
            </Picker>
          </View>
        </View>
      </Modal>
    )
  }
}

ActionPicker.propTypes = {
  title: PropTypes.string,
  labels: PropTypes.array.isRequired,
  values: PropTypes.array,
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  actionSheet: {
    backgroundColor: '#fff'
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  title: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 15,
  },
  titleText: {
    fontSize: Graphics.fontSizes.XL
  },
  button: {
    flex: 0,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: Graphics.colors.primary,
    fontSize: Graphics.fontSizes.XL
  }
})

export default ActionPicker