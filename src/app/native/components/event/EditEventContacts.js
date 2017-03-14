'use strict'

import React, {
  Component,
  PropTypes
} from 'react'

import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as newEventActions from '../../../redux/actions/newEventActions'

import styles from '../../styles/main'

import {
  AppSettings,
  Lang,
  Graphics
} from '../../../../common/__'

class EditEventContacts extends Component {
  constructor(props) {
    super(props)
    this._highCount = 5

    let tmpArray = []
    for (let i = this.props.contacts.length, j = this._highCount; i < j; i++) {
      tmpArray.push({
        title: '',
        mobileNumber: ''
      })
    }

    let newArray = this.props.contacts.concat(tmpArray) 

    if (newArray[0].title === '') {
      newArray[0].title = this.props.user.handle
      newArray[0].mobileNumber = this.props.user.mobile
    }

    this.state = {
      contacts: newArray
    }
  }

  componentWillUnmount() {
    let tmpArray = this.state.contacts,
      newArray = []

    for (let i = 0, j = this._highCount; i < j; i++) {
      if (tmpArray[i].title.trim().length > 1 && AppSettings.mobileRx.test(tmpArray[i].mobileNumber)) {
        newArray.push({
          title: tmpArray[i].title,
          mobileNumber: parseInt(tmpArray[i].mobileNumber)
        })
      }
    }

    this.props.newEventActions.setEventContacts(newArray)
  }

  _updateState(value, key, index) {
    let tmpArray = this.state.contacts
    tmpArray[index][key] = value

    this.setState({
      contacts: tmpArray
    })
  }

  render() {
    return (
      <View style={styles.global.wrapper}>
        <ScrollView style={styles.editor.scroll}>
          <View style={styles.editor.group}>
            <View style={styles.editor.row}>
              <View style={localStyles.cell}>
                <Text>{Lang.Called}</Text>
              </View>
              <View style={localStyles.cell}>
                <Text>{Lang.MobileNumber}</Text>
              </View>
            </View>
            {
              this.state.contacts.map((contact, index) => {
                return (
                  <View key={index} style={styles.editor.row}>
                    <View style={localStyles.cell}>
                      <View style={localStyles.underline}>
                        <TextInput
                          autoCorrect={false}
                          maxLength={10}
                          style={[localStyles.input, {width: 150}]}
                          placeholder={Lang.SomeDonkey}
                          value={contact.title}
                          onChangeText={(value) => this._updateState(value, 'title', index)}
                        />
                      </View>
                    </View>
                    <View style={localStyles.cell}>
                      <View style={localStyles.underline}>
                        <TextInput
                          autoCorrect={false}
                          keyboardType="phone-pad"
                          maxLength={AppSettings.mobileNumberLength}
                          style={[localStyles.input, {width: 120}]}
                          placeholder={Lang.MobileNumberSample}
                          value={contact.mobileNumber.toString()}
                          onChangeText={(value) => this._updateState(value, 'mobileNumber', index)}
                        />
                      </View>
                    </View>
                  </View>
                )
              })
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}

EditEventContacts.propTypes = {
  navigator: PropTypes.object.isRequired,
  newEventActions: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  user: PropTypes.object
}

const localStyles = StyleSheet.create({
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    color: Graphics.colors.midGray,
    marginRight: 2,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    height: 18,
    width: 120
  },
  underline: {
    borderBottomWidth: 1,
    borderBottomColor: Graphics.colors.border,
    paddingBottom: 2,
  }
})

function mapStateToProps(state, ownProps) {
  return {
    contacts: state.newEvent.contacts,
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    newEventActions: bindActionCreators(newEventActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEventContacts)