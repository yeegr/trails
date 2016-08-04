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

const Item = Picker.Item

class DurationPicker extends Component {
  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.onConfirm = this.onConfirm.bind(this)

    this.state = {
      duration: this.props.duration | 120,
      minuteInterval: this.props.interval | 1
    }
  }

  onCancel() {
    this.props.onCancel()
  }

  onConfirm() {
    this.props.onConfirm(this.state.selectedHour * 60 + this.state.selectedMinute)
    this.onCancel()
  }

  componentDidMount() {
    this.setState({
      selectedHour: Math.floor(this.state.duration / 60),
      selectedMinute: this.state.duration % 60
    })
  }

  render() {
    if (!this.props.showPicker) {
      return null
    }

    const mixStyles = Object.assign(styles, this.props.customStyles || null),
      title = (this.props.title) ? <Text style={mixStyles.titleText}>{this.props.title}</Text> : null

    let hours = [], minutes = []

    for (let i = 0, j = 100; i < j; i++) {
      hours.push(i)
    }

    for (let m = 0, n = 60; m < n; m += this.state.minuteInterval) {
      minutes.push(m)
    }

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
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Picker
                loop={true}
                style={{flex: 1}}
                selectedValue={this.state.selectedHour}
                onValueChange={(value) => this.setState({selectedHour: value})}
              >
              {
                hours.map((hour) => {
                  return (
                    <Picker.Item label={hour.toString()} value={hour} key={hour} />
                  )
                })
              }
              </Picker>
              <Picker
                loop={true}
                style={{flex: 1}}
                selectedValue={this.state.selectedMinute}
                onValueChange={(value) => this.setState({selectedMinute: value})}
              >
              {
                minutes.map((minute) => {
                  return (
                    <Picker.Item label={minute.toString()} value={minute} key={minute} />
                  )
                })
              }
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

DurationPicker.propTypes = {
  duration: PropTypes.number.isRequired,
  showPicker: PropTypes.bool.isRequired,
  cancelText: PropTypes.string.isRequired, 
  confirmText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  customStyles: PropTypes.object
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

export default DurationPicker