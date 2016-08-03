'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  DatePickerIOS,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import {
  Lang,
  Graphics
} from '../../settings'

class DateTimePicker extends Component {
  constructor(props) {
    super(props)
    this.onCancel = this.onCancel.bind(this)
    this.onConfirm = this.onConfirm.bind(this)

    let datetime = this.props.datetime

    if (this.props.mode === 'time') {
      let now = new Date()
      now.setHours(Math.floor(datetime / 60))
      now.setMinutes(datetime % 60)
      datetime = now
    }

    this.state = {
      mode: this.props.mode || 'datetime',
      interval: this.props.interval || 1,
      datetime
    }
  }

  onCancel() {
    this.props.onCancel()
  }

  onConfirm() {
    let dt = this.state.datetime

    if (this.props.mode === 'time') {
      dt = dt.getHours() * 60 + dt.getMinutes();
    }

    this.props.onConfirm(dt)
    this.onCancel()
  }

  render() {
    if (!this.props.showPicker) {
      return null
    }

    const title = (this.props.title) ? <Text style={styles.titleText}>{this.props.title}</Text> : null

    return (
      <Modal animationType={"fade"} transparent={true}>
        <View style={styles.wrapper}>
          <View style={styles.actionSheet}>
            <View style={styles.toolbar}>
              <TouchableOpacity onPress={this.onCancel}>
                <Text style={styles.buttonText}>{this.props.cancelText}</Text>
              </TouchableOpacity>
              <View style={styles.title}>
                {title}
              </View>
              <TouchableOpacity onPress={this.onConfirm}>
                <Text style={styles.buttonText}>{this.props.confirmText}</Text>
              </TouchableOpacity>
            </View>
            <DatePickerIOS
              mode={this.state.mode}
              maximumDate={this.props.maximumDate}
              minimumDate={this.props.minimumDate}
              mode={this.state.mode}
              minuteInterval={this.state.interval}
              date={this.state.datetime}
              onDateChange={(value) => this.setState({datetime: value})}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Graphics.actionSheet.maskColor,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end'
  },
  actionSheet: {
    backgroundColor: Graphics.actionSheet.backgroundColor
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

DateTimePicker.propTypes = {
  datetime: PropTypes.any.isRequired,
  showPicker: PropTypes.bool.isRequired,
  cancelText: PropTypes.string.isRequired, 
  confirmText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  mode: PropTypes.string,
  interval: PropTypes.number
}

export default DateTimePicker