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
  DatePickerIOS,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

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

    const mixStyles = Object.assign(styles, this.props.customStyles || null),
      title = (this.props.title) ? <Text style={mixStyles.titleText}>{this.props.title}</Text> : null

    return (
      <Modal animationType={"fade"} transparent={true}>
        <View style={styles.wrapper}>
          <View style={styles.actionSheet}>
            <View style={styles.toolbar}>
              <TouchableOpacity onPress={this.onCancel}>
                <Text style={[{color: AppSettings.color.midGray}, mixStyles.buttonText]}>{this.props.cancelText}</Text>
              </TouchableOpacity>
              <View style={styles.title}>
              {title}
              </View>
              <TouchableOpacity onPress={this.onConfirm}>
                <Text style={mixStyles.buttonText}>{this.props.confirmText}</Text>
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
  titleText: Object.assign({},
    AppSettings.textStyles.extraLarge),
  button: {
    flex: 0,
    paddingHorizontal: 15,
  },
  buttonText: Object.assign({},
    AppSettings.textStyles.extraLarge,
    {
      color: AppSettings.color.primary
    }),
})

export default DateTimePicker